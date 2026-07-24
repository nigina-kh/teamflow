import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';


@Injectable()
export class ProjectsService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(
    userId: string,
    dto: CreateProjectDto,
  ) {


    const membership =
      await this.prisma.workspaceMembership.findUnique({

        where: {

          userId_workspaceId: {

            userId,

            workspaceId: dto.workspaceId,

          },

        },

      });




    if (!membership) {

      throw new ForbiddenException(
        'You are not a workspace member',
      );

    }




    return this.prisma.project.create({

      data: {

        name: dto.name,

        description: dto.description,

        workspaceId: dto.workspaceId,

      },

    });


  }





  async findAll(
    workspaceId: string,
  ) {


    return this.prisma.project.findMany({

      where: {

        workspaceId,

      },

    });


  }


}