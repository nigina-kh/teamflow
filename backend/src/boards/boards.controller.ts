import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateBoardDto,
  ) {
    return this.boardsService.create(
      user.id,
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Query('projectId') projectId: string,
  ) {
    return this.boardsService.findAll(
      projectId,
    );
  }
}