import { Injectable,UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { UserService } from '../../user/user.service';
import {encryptPassword} from '../../common/crypto'
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService:JwtService,
        private readonly userService:UserService
    ){ }
    async validateUser(username: string, password: string): Promise<any> {
        console.log('JWT验证 - Step 2: 校验用户信息');
        const user = await this.userService.findAll(username);
        // 注：实际中的密码处理应通过加密措施
        if(!user){
          return {code:400,message:'查无此人'}
        }
        if (user && user.password === password) {
          const { password, ...userInfo } = user;
          return {...userInfo,code:0,message:'success'};
        } else {
          return {code:1,message:'密码错误'}
        }
      }

      
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      id: user.id
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证',payload);
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: user.code,
        token,
        msg: user.message,
      };
    } catch (error) {
      return {
        code: 400,
        msg: `账号或密码错误`,
      };
    }
  }
}
