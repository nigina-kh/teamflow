import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';


@Controller('workspaces')
export class WorkspacesController {

  constructor(
    private readonly workspacesService: WorkspacesService,
  ) {}


  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateWorkspaceDto,
  ) {

    return this.workspacesService.create(
      user.id,
      dto,
    );

  }


  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @CurrentUser() user: any,
  ) {

    return this.workspacesService.findAll(
      user.id,
    );

  }

}