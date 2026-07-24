import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';

@Controller('labels')
export class LabelsController {
  constructor(
    private readonly labelsService: LabelsService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateLabelDto,
  ) {
    return this.labelsService.create(
      user.id,
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Query('workspaceId') workspaceId: string,
  ) {
    return this.labelsService.findAll(
      workspaceId,
    );
  }
}