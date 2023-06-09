import { Injectable, Inject ,Logger as defaultLogger} from '@nestjs/common';
import { Cron,Interval,Timeout } from '@nestjs/schedule';
// import { Logger } from 'winston';
import {comment} from '../../common/loopTask'
import { WinstonClass } from '../../common/winston';
import {checkOrder} from '../../common/checkOrder'

@Injectable()
export class ScheduleService {
    private readonly defaultlogger = new defaultLogger()
    private readonly logger =  WinstonClass()
   constructor(){}

  // @Cron('*/10 * * * * *')  //每10s执行一次
  handleTimeout() {
    console.log('5 * * * * *')
    // comment();    //定时执行该函数调用自身loopTask接口，后期启用注释本调用即可
    this.defaultlogger.log('每10s执行任务开始执行了');
    this.logger.info('每10s执行任务开始执行了');

  }


  @Cron('0 0 * * * *') // 设置任务每小时执行一次
  handleCron() {
    checkOrder();
    // this.defaultlogger.log('每小时执行任务开始执行了');
    // this.logger.info('每小时执行任务开始执行了');
  }
}
