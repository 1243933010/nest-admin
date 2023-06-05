import { Strategy,ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { jwtKey } from "./config";
// import { AuthService } from "./auth.service";
let opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration:false,
    secretOrKey:jwtKey.secret
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super(opts)
    }
    async validate(payload){
        console.log(`JWT验证 - Step 4: 被守卫调用`,payload);
        
        return payload;
    }
}