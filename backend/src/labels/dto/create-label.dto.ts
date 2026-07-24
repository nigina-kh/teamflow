import {
  IsString,
  IsUUID,
  IsHexColor,
} from 'class-validator';

export class CreateLabelDto {
  @IsUUID()
  workspaceId: string;

  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}