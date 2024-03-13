import { Entity, Column } from 'typeorm';
@Entity()
export class Task {
  static getAllTasks(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  id: number;
  @Column()
  text: string;
  @Column({ default: false })
  isCompleted: boolean;

  constructor(text: string, isCompleted: boolean = false) {
    this.text = text;
    this.isCompleted = isCompleted;
  }
}
