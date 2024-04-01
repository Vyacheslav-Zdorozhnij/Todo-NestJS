import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { TaskService } from './todoList.service';
import { CheckAllTodo, CreateTaskDto } from './dto/create-taskDto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll() {
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() taskDto: CreateTaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Put('/:id')
  updateAllTasks(@Body() taskDto: CheckAllTodo) {
    return this.taskService.updateAllTasksStatus(taskDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Delete()
  deleteAll() {
    return this.taskService.deleteAllTasks();
  }
}
