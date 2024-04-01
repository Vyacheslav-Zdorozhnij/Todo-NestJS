import { Module } from '@nestjs/common';
import { TaskController } from './todoList.controller';
import { TaskService } from './todoList.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tasks } from 'src/model/taskModel';

@Module({
  imports: [SequelizeModule.forFeature([Tasks])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TodoListModule {}
