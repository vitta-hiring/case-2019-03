import { IsNotEmpty, IsString } from 'class-validator';

export class DrugUpdateDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}