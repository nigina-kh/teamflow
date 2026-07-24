import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateTaskDto,
  ) {
    return this.tasksService.create(
      user.id,
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Query('boardId') boardId: string,
  ) {
    return this.tasksService.findAll(
      boardId,
    );
  }
}