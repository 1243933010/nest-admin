import {Injectable,NestInterceptor,CallHandler, Inject} from '@nestjs/common';
import { map, Observable } from 'rxjs';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger } from 'winston';

interface Data<T>{
    data:T
}
@Injectable()
export class Respon<T> implements NestInterceptor{
    
    constructor(@Inject('winston') private readonly logger:Logger){}
        intercept(context, next: CallHandler):Observable<Data<T>>{
            return next.handle().pipe(map(data=>{
                let result = JSON.parse(JSON.stringify(data));
                Reflect.deleteProperty(result,'message')
                Reflect.deleteProperty(result,'code')
                this.logger.info('response',result)
                return {
                    data:result.data?result.data:result,
                    code:data?.code?data.code:0,
                    message:data?.message?data.message:'success'
                }
            }))
    }
}