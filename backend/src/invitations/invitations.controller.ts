import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';

import { InvitationsService } from './invitations.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateInvitationDto } from './dto/create-invitation.dto';


@Controller('invitations')
export class InvitationsController {

  constructor(
    private readonly invitationsService: InvitationsService,
  ) {}


  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() dto: CreateInvitationDto,
  ) {

    return this.invitationsService.create(
      user.id,
      dto,
    );

  }


  @UseGuards(JwtGuard)
  @Get()
  findAll(
    @Query('workspaceId') workspaceId: string,
  ) {

    return this.invitationsService.findAll(
      workspaceId,
    );

  }


  @UseGuards(JwtGuard)
  @Post(':token/accept')
  accept(
    @CurrentUser() user: any,
    @Param('token') token: string,
  ) {

    return this.invitationsService.accept(
      user.id,
      token,
    );

  }

}