import { Injectable, Inject ,Logger as defaultLogger} from '@nestjs/common';
import { Cron,Interval,Timeout } from '@nestjs/schedule';
// import { Logger } from 'winston';
import {comment} from '../../common/loopTask'
import { WinstonClass } from '../../common/winston';
@Injectable()
export class ScheduleService {
    private readonly defaultlogger = new defaultLogger()
    private readonly logger =  WinstonClass()
   constructor(){}

  @Cron('5 * * * * *')  //每搁一分钟执行一次，从第5s开始
  handleTimeout() {
    console.log('5 * * * * *')
    comment();    //定时执行该函数调用自身loopTask接口，后期启用注释本调用即可
    this.defaultlogger.log('执行任务开始执行了');
    this.logger.info('执行任务开始执行了');

  }
}
