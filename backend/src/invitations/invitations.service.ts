import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { randomUUID } from 'crypto';


@Injectable()
export class InvitationsService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(
    userId: string,
    dto: CreateInvitationDto,
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



    if (!membership || membership.role === 'GUEST') {
      throw new ForbiddenException(
        'No permission to invite users',
      );
    }



    return this.prisma.invitation.create({

      data: {

        email: dto.email,

        workspaceId: dto.workspaceId,

        token: randomUUID(),

        status: 'PENDING',

        expiresAt: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7,
        ),

      },

    });

  }




  async findAll(
    workspaceId: string,
  ) {

    return this.prisma.invitation.findMany({

      where: {
        workspaceId,
      },

    });

  }





  async accept(
    userId: string,
    token: string,
  ) {


    const invitation =
      await this.prisma.invitation.findUnique({

        where: {
          token,
        },

      });



    if (!invitation) {

      throw new NotFoundException(
        'Invitation not found',
      );

    }




    if (invitation.status !== 'PENDING') {

      throw new BadRequestException(
        'Invitation already used',
      );

    }




    if (invitation.expiresAt < new Date()) {

      throw new BadRequestException(
        'Invitation expired',
      );

    }





    const user =
      await this.prisma.user.findUnique({

        where: {
          id: userId,
        },

      });




    if (!user) {

      throw new NotFoundException(
        'User not found',
      );

    }





    if (user.email !== invitation.email) {

      throw new ForbiddenException(
        'This invitation is not for you',
      );

    }






    const existingMembership =
      await this.prisma.workspaceMembership.findUnique({

        where: {

          userId_workspaceId: {

            userId,

            workspaceId: invitation.workspaceId,

          },

        },

      });





    if (existingMembership) {

      throw new BadRequestException(
        'Already a workspace member',
      );

    }







    await this.prisma.workspaceMembership.create({

      data: {

        userId,

        workspaceId: invitation.workspaceId,

        role: 'MEMBER',

      },

    });







    return this.prisma.invitation.update({

      where: {

        token,

      },

      data: {

        status: 'ACCEPTED',

      },

    });


  }


}