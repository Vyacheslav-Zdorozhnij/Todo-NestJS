import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TaskController } from './todoList.controller';
import { TaskService } from './todoList.service';
import { Tasks } from 'src/model/taskModel';

@Module({
  imports: [SequelizeModule.forFeature([Tasks])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TodoListModule {}
