import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';


@Controller('projects')
export class ProjectsController {

  constructor(
    private readonly projectsService: ProjectsService,
  ) {}


  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateProjectDto,
  ) {

    return this.projectsService.create(
      user.id,
      dto,
    );

  }



  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Query('workspaceId') workspaceId: string,
  ) {

    return this.projectsService.findAll(
      workspaceId,
    );

  }

}