
import { WinstonClass } from '../common/winston';
import axios, { } from 'axios';

export const checkOrder = () => {  //触发接口，定时拉取订单数据

    axios.post('http://localhost:3003/loopTask/find', {}).then((res) => {
        const { data } = res;
        // console.log(data);
        getOrderList();
    })
}

const packageOptions = {
    AuthoriZation: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwd2QiOiJlYTVlMDQ0MTNlOGNkZGFlNzlhY2MzYmFjYTE0ZmUxMCIsImlzcyI6InNob3Auenlqc2wuY29tIiwiYXVkIjoic2hvcC56eWpzbC5jb20iLCJpYXQiOjE2ODUzMjAzOTIsIm5iZiI6MTY4NTMyMDM5MiwiZXhwIjoxNjg3OTEyMzkyLCJqdGkiOnsiaWQiOjEsInR5cGUiOiJhZG1pbiJ9fQ.0qvPHfdAXQp1pnPPZxjaH9pCbAN3hN6Zg2I79gC1QPY',//自己项目需要的jwt
    paramsData: {},
    getUrl: 'https://shop.zyjsl.com/adminapi/order/list?page=1&limit=10&status=&pay_type=&data=&real_name=&field_key=&type='
}

const getOrderList = async () => {
    const logger = WinstonClass();
    logger.log('error', 'test')
    let result = await axios.get(packageOptions.getUrl, {
        headers: {
            'Authori-Zation': `Bearer ${packageOptions.AuthoriZation}`,
        },
    })
    let { data } = result;
    if (data.status === 200) {
        handleData(data.data.data)
    }
    // console.log(data.data.data);
}

type dataTypes = {
    status: number
    shipping_type: number
    pinkStatus: number | null
    _status: number
}

const handleData = (arr: dataTypes[]) => {
    const logger = WinstonClass();
    let arrs = [];
    arr.forEach(val => {
        if ((val.status === 4 || val._status === 2 || val._status === 8) && val.shipping_type === 1 && (val.pinkStatus === null || val.pinkStatus === 2)) {
            // console.log(val)
            arrs.push(val);
        }
    })
    console.log('当前未发货数量为', arrs.length)
    if (arrs.length > 0) {
        let str = ``;
        arrs.forEach(val => {
            let time = new Date(val._pay_time).getTime();
            let newTime = new Date().getTime();
            // console.log(time,newTime,val._pay_time)
            let strr = `购买人:${val.real_name},
            购买金额:${val._info[val.cart_id[0]].cart_info.sum_true_price},
            单价:${val._info[val.cart_id[0]].cart_info.sum_price},
            产品名称:${val._info[val.cart_id[0]].cart_info.productInfo.store_info},
            个数:${val._info[val.cart_id[0]].cart_info.productInfo.temp_id},
            距今时间:${((newTime-time)/3600000).toFixed(1)}h
            -------------------------------------`
            console.error(strr)
         str = str + strr;
        })
    logger.log('error',`当前未发货数量为: ${arrs.length},`+ str)
    }
}