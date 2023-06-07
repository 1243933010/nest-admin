import { Injectable } from '@nestjs/common';
import { CreateLoopTaskDto } from './dto/create-loop-task.dto';
import { UpdateLoopTaskDto } from './dto/update-loop-task.dto';
import {thirdParty,filterData} from '../common/loopTask'

@Injectable()
export class LoopTaskService {
 async create(createLoopTaskDto: CreateLoopTaskDto) {
    let result:any = await thirdParty({pageSize:createLoopTaskDto.pageSize});
    let data:any;
    if(result){
       data= JSON.parse(result);
    }
     filterData(data.comments);
    // console.log(createLoopTaskDto,'----',data.comments)
    return {code:200,message:'success'}
    // return 'This action adds a new loopTask';
  }

  findAll() {
    return `This action returns all loopTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loopTask`;
  }

  update(id: number, updateLoopTaskDto: UpdateLoopTaskDto) {
    return `This action updates a #${id} loopTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} loopTask`;
  }
}
