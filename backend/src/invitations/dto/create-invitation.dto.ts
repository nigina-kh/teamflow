import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateInvitationDto {

  @IsEmail()
  email: string;


  @IsUUID()
  workspaceId: string;

}