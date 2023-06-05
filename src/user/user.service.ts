import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository,Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './entities/user.entity'
import {UserLabel} from './entities/userLabel.tntity'
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user:Repository<User>,
    @InjectRepository(Permission) private readonly permission:Repository<Permission>,
    @InjectRepository(UserLabel) private readonly userLabel:Repository<UserLabel>

  ){}

  async create(createUserDto: CreateUserDto) {
    let res = await this.user.findOne({where:{username:createUserDto.username}});
    if(res){
      return {code:400,message:'当前账户已被注册'}
    }
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    data.role = 'common';//默认设置为普通角色

    this.user.save(data);
    return {message:'添加成功'};
  }

  async findAll(username:string):Promise<any> {
    let res = await this.user.findOne({where:{username}});
    return res;
  }

  async getUserInfo(name:string){
    let res = await this.user.findOne({relations:['userLabel'], where:{username:name}})
    if(!res){
      return {message:'无数据'}
    }
    let result = await this.permission.find({where:{role:res.role}})
    //console.log(result,'===');
    let {password,...data} = res;
    return data;
  }

  async updateUserInfo(body){
    let {password,id,labelList,...res} = body;
    console.log(res)
    if(labelList){
      let data = await this.updateLabel(id,labelList);
      await this.deleteLabel();
    }
    let result = await this.user.update(id,res);
   console.log(result);
    return {message:'更新用户信息成功'}
  }
  
  async updateLabel(id:number,labelList:any[]){
    let labelArr = labelList;
    const tableDetail = await this.user.findOne({where:{id:id}});
    const tagList:UserLabel[] = [];
    for(let i = 0;i<labelArr.length;i++){
      let T = new UserLabel();
       T.label = labelArr[i].label;
      
      await this.userLabel.save(T)
      tagList.push(T);
    }
   tableDetail.userLabel = tagList;
   this.user.save(tableDetail);

  }
  async deleteLabel(){
   let data = await this.userLabel.find({})
   console.log(data,'===')
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
