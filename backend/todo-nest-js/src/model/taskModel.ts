import { DataType, Model, Table, Column } from 'sequelize-typescript';

@Table({ tableName: 'tasks' })
export class Tasks extends Model<Tasks> {
  @Column({ type: DataType.BIGINT, unique: true, primaryKey: true })
  id: bigint;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isCompleted: boolean;
}
