import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class WorkspacesService {

  constructor(
    private prisma: PrismaService,
  ) {}



  async create(
    userId: string,
    data: {
      name: string;
      description?: string;
    },
  ) {

    const slug =
      data.name
        .toLowerCase()
        .replace(/\s+/g, '-');


    return this.prisma.workspace.create({

      data: {
        name: data.name,
        slug,
        description: data.description,

        ownerId: userId,

        memberships: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },

      include: {
        memberships: true,
      },

    });

  }





  async findAll(
    userId: string,
  ) {

    return this.prisma.workspace.findMany({

      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },

      include: {
        memberships: true,
      },

    });

  }





  async findOne(
    id: string,
    userId: string,
  ) {

    const workspace =
      await this.prisma.workspace.findFirst({

        where: {
          id,

          memberships: {
            some: {
              userId,
            },
          },
        },


        include: {

          memberships: {

            include: {

              user: {

                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                },

              },

            },

          },

        },

      });



    if (!workspace) {
      throw new NotFoundException(
        'Workspace not found',
      );
    }


    return workspace;

  }





  async members(
    workspaceId: string,
    userId: string,
  ) {


    const membership =
      await this.prisma.workspaceMembership.findUnique({

        where: {

          userId_workspaceId: {

            userId,
            workspaceId,

          },

        },

      });



    if (!membership) {

      throw new ForbiddenException(
        'You are not a workspace member',
      );

    }



    return this.prisma.workspaceMembership.findMany({

      where: {
        workspaceId,
      },


      include: {

        user: {

          select: {

            id: true,
            email: true,
            firstName: true,
            lastName: true,

          },

        },

      },

    });

  }


}