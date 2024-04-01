import { DataType, Model, Table, Column } from 'sequelize-typescript';

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isCompleted: boolean;
}
