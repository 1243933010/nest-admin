
import axios, { } from 'axios';
import { WinstonClass } from '../common/winston';
import { Readable } from 'stream';
import * as FormData from 'form-data';

import { createWriteStream, createReadStream } from 'fs';
import { resolve } from 'path';




type thirdPartyTypes = {
    pageSize: number
}

type filterDataTypes = {
    productColor: string,
    images: { imgUrl: string }[],
    score:number
}

type uploadTypes = {
    data: { src: string },
    status: number,
    score:number
}

let pageSize = 20;//拉取分页起始页数
const packageOptions = {  //具体配置对象数据
    get thirdPartyUrl(){
        return `https://api.m.jd.com/?appid=item-v3&functionId=pc_club_productPageComments&client=pc&clientVersion=1.0.0&t=1686205768371&loginType=3&uuid=122270672.1668498897411235926214.1668498897.1686193203.1686205632.22&productId=28937255040&score=0&sortType=5&page=${pageSize}&pageSize=10&isShadowSku=0&rid=0&fold=1&bbtf=&shield=`
    },
    strReg:'',//筛选条件
    index:0,//获取当前分页的数据的索引位置，默认第一条符合条件数据
    imgStr:'n0/s128x96_jfs',//图片链接需要被替换的字符串
    imgStrReg:"shaidan/s616x405_jfs",//图片链接替换的字符串
    imgFiles:'../../src/images',//图片保存的相对路径位置
    AuthoriZation:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwd2QiOiJlYTVlMDQ0MTNlOGNkZGFlNzlhY2MzYmFjYTE0ZmUxMCIsImlzcyI6InNob3Auenlqc2wuY29tIiwiYXVkIjoic2hvcC56eWpzbC5jb20iLCJpYXQiOjE2ODUzMjAzOTIsIm5iZiI6MTY4NTMyMDM5MiwiZXhwIjoxNjg3OTEyMzkyLCJqdGkiOnsiaWQiOjEsInR5cGUiOiJhZG1pbiJ9fQ.0qvPHfdAXQp1pnPPZxjaH9pCbAN3hN6Zg2I79gC1QPY',//自己项目需要的jwt
    uploadUrl:'https://shop.zyjsl.com/adminapi/file/upload',//上传图片接口地址
    host : 'https://shop.zyjsl.com',//默认项目图片前缀
    formdata :{
        add_time: '',
        avatar: 'https://shop.zyjsl.com/uploads/attach/2023/05/20230530/f4dc7c45c3907ea24e5c72aa488ae7de.jpg',
        comment: '',
        image: {
            image: "https://shop.zyjsl.com/uploads/attach/2023/05/20230524/3689fbaa50e88034173c28a2e3d9c6b2.jpg",
            product_id: 16
        },
        nickname: "微信用户",
        pics: [],
        product_score: 5,
        service_score: 5

    },//提交评论的默认数据
    replaceStr:'京东',//剔除的字符串
    saveFictitiousReply:'https://shop.zyjsl.com/adminapi/product/reply/save_fictitious_reply.html',//发布评论接口
}

export const thirdParty = (options: thirdPartyTypes) => {  //拉取京东分页评论
    let { pageSize } = options;
    console.log('即将拉取京东评论', pageSize)
    return new Promise((resolve, reject) => {
        axios.get(packageOptions.thirdPartyUrl, {
            responseType: 'arraybuffer', // 注意：这里需要设置 responseType 为 arraybuffer 或 blob
            headers: {
                'Accept-Encoding': 'gzip,compress,deflate', // 启用压缩功能
                'Content-Type': 'application/json;charset=gbk', // 指定 GBK 编码格式
            },
        }).then((res) => {
            const decoder = new TextDecoder('gbk') // 使用 GBK 编码构造 TextDecoder
            const data = decoder.decode(res.data) // 解码响应数据
            // console.log(data)
            resolve(data);
        })
    })
}




export const comment = () => {  //调用自身接口，定时任务触发
    pageSize = pageSize + 1;
    console.log('当前页面size', pageSize)
    axios.post('http://localhost:3003/loopTask', { pageSize: pageSize }).then((res) => {
        // console.log(res);
    })
}



export const filterData = async (arr: filterDataTypes[]) => {  //筛选数据，整合数据
    let logger = WinstonClass();
    // const strReg: string = packageOptions.strReg;   //暂时筛选条件设定
    let options: filterDataTypes;
    for(let i = 0;i<arr.length;i++){
        if (arr[i].productColor.includes( packageOptions.strReg)&&arr[i].score===5) { //暂时筛选条件设定
            options = arr[i];
            break;
        }
    }

    if (options) {
        // logger.info('response', options);
        console.log(options)
        if (options?.images?.length > 0) {
            let imgUrl = options.images[0].imgUrl.replace(packageOptions.imgStr,packageOptions.imgStrReg)
            let files = await pushImage(`https:${imgUrl}`, options);
            console.log(`https:${imgUrl}`, '===========', options.images[0].imgUrl.indexOf(packageOptions.imgStr))
        } else {
            await pushImage(``, options);
        }

    } else {
        
        comment();
    }

}

async function downloadImage(url: string, filename: string): Promise<string> {  //把图片下载放到本地
    const response = await axios.get(url, { responseType: 'stream' });
    const filePath = resolve(__dirname, packageOptions.imgFiles, filename);
    return new Promise((resolve, reject) => {
        const writer = createWriteStream(filePath);
        response.data.pipe(writer);
        writer.on('finish', () => {
            // console.log(filePath)
            resolve(filePath);
        });
        writer.on('error', (err) => {
            // console.log(err)
            reject(err);
        });
    });
}

export const pushImage = async (url: string, options: object) => {  //把评论图片下载下来同时传到项目里面去，返回图片路径
    if (url) {
        let name = new Date().getTime();
        let data = await downloadImage(url, `${name}.png`);
        let result: uploadTypes = await uploadImage(data, packageOptions.uploadUrl, packageOptions.AuthoriZation);
        if (result.status === 200) {
            let res = await pushTask(result.data.src, options, packageOptions.AuthoriZation);
            // console.log(res);
        }
    } else {
        await pushTask('', options, packageOptions.AuthoriZation);
    }

}



async function uploadImage(filePath: string, url: string, token: string): Promise<any> {  //图片上传到项目接收返回路径
    const data = new FormData();
    data.append('file', createReadStream(filePath));
    data.append('pid', 0);

    const response = await axios.post(url, data, {
        headers: {
            ...data.getHeaders(),
            'Authori-Zation': `Bearer ${token}`,
        },
    });

    return response.data;
}


const pushTask = async (url: string, options: any, AuthoriZation: string) => {  //把合适的数据添加到项目里面去
    let logger = WinstonClass();
    packageOptions.formdata.add_time = getRandDateThisMonth();
    packageOptions.formdata.comment = options.content.replace(packageOptions.replaceStr,'');
    packageOptions.formdata.pics = url?[`${packageOptions.host}${url}`]:[]
    console.log( packageOptions.formdata,'===')
    let res = await axios.post(packageOptions.saveFictitiousReply,  packageOptions.formdata, {
        headers: {
            'Authori-Zation': `Bearer ${AuthoriZation}`,
        },
    })
    // console.log(res);
    logger.info('formdata', packageOptions.formdata);
}


// 返回指定日期范围内的随机日期和时间，但不包括凌晨1点到6点
function getRandomDateInRange(startDate, endDate) {
    const start = new Date(startDate); // 开始日期
    const end = new Date(endDate); // 结束日期
    // 计算开始和结束日期之间的毫秒数差值
    const diff = end.getTime() - start.getTime();
    // 随机生成一个 0~diff 之间的毫秒数
    const rand = Math.floor(Math.random() * diff);
    // 将毫秒数转换为日期时间格式
    const date = new Date(start.getTime() + rand);
    // 检查是否在凌晨1点到6点之间，如果是，则重新生成随机日期和时间
    if (date.getHours() >= 1 && date.getHours() < 6) {
      return getRandomDateInRange(startDate, endDate);
    }
    // 返回日期字符串
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  
  // 返回当月当天到上个月一号这一段时间的随机日期和时间，但不包括凌晨1点到6点
  function getRandDateThisMonth() {
    const today = new Date(); // 今天的日期
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // 上个月的第一天日期
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1); // 当月第一天日期
    const endDate = lastMonth; // 结束日期为上个月的第一天
    // 返回随机日期和时间
    return getRandomDateInRange(startDate, endDate);
  }
  
