import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsDateString,
} from 'class-validator';

import {
  TaskPriority,
  TaskStatus,
} from '@prisma/client';

export class CreateTaskDto {
  @IsUUID()
  boardId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}