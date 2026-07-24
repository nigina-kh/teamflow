import {
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBoardDto {
  @IsUUID()
  projectId: string;

  @IsString()
  name: string;
}