import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class DrugInteractionUpdateDto {
  @IsOptional()
  @IsString()
  nome: string;
  @IsOptional()
  @IsString()
  descricao: string;
  @IsOptional()
  @IsNumber()
  farmaco1: number;
  @IsOptional()
  @IsArray()
  farmaco2: number[];
}
