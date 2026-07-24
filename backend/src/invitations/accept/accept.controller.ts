import {
  Controller,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';

import { InvitationsService } from '../invitations.service';
import { JwtGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';


@Controller('invitations/accept')
export class AcceptController {

  constructor(
    private readonly invitationsService: InvitationsService,
  ) {}


  @UseGuards(JwtGuard)
  @Post(':token')
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