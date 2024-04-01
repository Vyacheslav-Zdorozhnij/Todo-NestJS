import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  readonly id: number;
  @IsString()
  readonly text: string;
  @IsBoolean()
  readonly isCompleted: boolean;
}

export class CheckAllTodo {
  @IsBoolean()
  isCompleted: boolean;
}
