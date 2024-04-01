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

  @Get('/all')
  getAll() {
    return this.taskService.getAllTask();
  }

  @Post('/add')
  createTask(@Body() taskDto: CreateTaskDto) {
    console.log('CONTROLLER DTO > ', taskDto);
    return this.taskService.createTask(taskDto);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() taskDto: CreateTaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Put('/update-all-status')
  updateAllTasks(@Body() taskDto: CheckAllTodo) {
    return this.taskService.updateAllTasksStatus(taskDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @Delete('/delete-all-complited')
  deleteAll() {
    return this.taskService.deleteAllTasks();
  }
}
