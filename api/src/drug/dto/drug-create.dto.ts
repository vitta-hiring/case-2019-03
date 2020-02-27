import { IsNotEmpty, IsString } from 'class-validator';

export class DrugCreateDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}
