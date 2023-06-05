import {ExceptionFilter,Catch,ArgumentsHost,HttpException, HttpStatus,Inject} from '@nestjs/common';
import {Request,Response} from 'express';
import { Logger } from 'winston';

@Catch() //HttpException
export class HttpFilter implements ExceptionFilter{
    constructor(@Inject('winston') private readonly logger:Logger){}
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception,'=======')
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const data = {
            data:exception,
            time:new Date().getTime(),
            message:exception.message||'',
            //success:false,
            code:HttpStatus.BAD_REQUEST,
            path:request.url,
        }

        this.logger.error('error',data)
        const status = exception.getStatus? exception.getStatus():400;
        response.status(status).json(data)
        
    }
}
