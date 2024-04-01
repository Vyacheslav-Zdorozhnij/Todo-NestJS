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

@Controller('/api')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/tasks')
  getAll() {
    return this.taskService.getAllTask();
  }

  @Post('/tasks')
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Put('tasks/:id')
  update(@Param('id') id: number, @Body() taskDto: CreateTaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Put('/tasks/:id')
  updateAllTasks(@Body() taskDto: CheckAllTodo) {
    return this.taskService.updateAllTasksStatus(taskDto);
  }

  @Delete('/tasks/:id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Delete('/tasks')
  deleteAll() {
    return this.taskService.deleteAllTasks();
  }
}
