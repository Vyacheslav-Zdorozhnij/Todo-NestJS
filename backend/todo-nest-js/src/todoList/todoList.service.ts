import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks } from 'src/model/taskModel';
import { InjectModel } from '@nestjs/sequelize';
import { CheckAllTodo, CreateTaskDto } from './dto/create-taskDto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Tasks) private tasksRepository: typeof Tasks) {}

  async getAllTask() {
    try {
      const tasks = await this.tasksRepository.findAll();
      return tasks;
    } catch (error) {
      throw new NotFoundException(`Not found`);
    }
  }

  async createTask(dto: CreateTaskDto) {
    try {
      const task = await this.tasksRepository.create(dto);
      return task;
    } catch (error) {
      throw new NotFoundException(`Task with task  not created`);
    }
  }

  async updateTask(id: number, dto: CreateTaskDto) {
    try {
      const newTask = await this.tasksRepository.update(
        { text: dto.text, isCompleted: dto.isCompleted },
        { where: { id }, returning: true },
      );
      return newTask;
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateAllTasksStatus(dto: CheckAllTodo) {
    try {
      const updateStatusTask = await this.tasksRepository.update(
        { isCompleted: dto.isCompleted },
        { where: {} },
      );
      return updateStatusTask;
    } catch (error) {
      throw new NotFoundException(`Task with tasks not found`);
    }
  }

  async deleteTask(id: number) {
    try {
      const task = await this.tasksRepository.destroy({ where: { id } });
      return task;
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async deleteAllTasks() {
    try {
      const deleteAllTask = await this.tasksRepository.destroy({
        where: {
          isCompleted: true,
        },
      });
      return deleteAllTask;
    } catch (error) {
      throw new NotFoundException(`Task with tasks not found`);
    }
  }
}
