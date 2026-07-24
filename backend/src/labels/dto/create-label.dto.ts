import { IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  workspaceId: string;

  @IsString()
  name: string;

  @IsString()
  color: string;
}