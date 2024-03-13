import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './todoList.service';
import { CreateTaskDto } from './dto/create-taskDto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto);
  }
  @Get()
  getAll() {
    return this.taskService.getAllTask();
  }

  @Patch(':id')
  update(@Param('id') id: bigint, @Body() taskDto: CreateTaskDto) {
    return this.taskService.updateTask(id, taskDto);
  }

  @Put('/update-all-tasks-status')
  updateAllTasks(@Body() taskDto: CreateTaskDto) {
    return this.taskService.updateAllTasksStatus(taskDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: bigint) {
    return this.taskService.deleteTask(id);
  }

  @Delete('/deleteAllComplited')
  deleteAll() {
    return this.taskService.deleteAllTasks();
  }
}
