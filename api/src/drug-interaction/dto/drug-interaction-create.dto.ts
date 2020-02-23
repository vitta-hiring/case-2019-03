import { IsNotEmpty, IsString } from 'class-validator';

export class DrugInteractionCreateDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsString()
  descricao: string;
  @IsNotEmpty()
  @IsString()
  farmaco1: string;
  @IsNotEmpty()
  @IsString()
  farmaco2: string;
}
