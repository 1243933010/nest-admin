import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtKey } from './config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
@Module({
  imports:[
    UserModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:jwtKey.secret,
      signOptions:{
        expiresIn:'12h'
      }
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
