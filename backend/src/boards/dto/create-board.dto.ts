import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  projectId: string;

  @IsString()
  name: string;
}