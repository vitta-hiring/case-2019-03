import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class DrugInteractionCreateDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsString()
  descricao: string;
  @IsNotEmpty()
  @IsNumber()
  farmaco1: number;
  @IsNotEmpty()
  @IsArray()
  farmaco2: number[];
}
