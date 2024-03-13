import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks } from 'src/model/taskModel';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-taskDto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Tasks) private tasksRepository: typeof Tasks) {}

  async createTask(dto: CreateTaskDto) {
    const task = await this.tasksRepository.create(dto);
    return task;
  }

  async getAllTask() {
    const tasks = await this.tasksRepository.findAll();
    return tasks;
  }

  async updateTask(id: bigint, dto: CreateTaskDto) {
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

  async updateAllTasksStatus(dto: CreateTaskDto) {
    const updateStatusTask = await this.tasksRepository.update(
      { isCompleted: dto.isCompleted },
      { where: {} },
    );
    return updateStatusTask;
  }

  async deleteTask(id: bigint) {
    try {
      const task = await this.tasksRepository.destroy({ where: { id } });
      return task;
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async deleteAllTasks() {
    const deleteAllTask = await this.tasksRepository.destroy({
      where: {
        isCompleted: true,
      },
    });
    return deleteAllTask;
  }
}
