import { IsString, IsOptional } from 'class-validator';

export class DrugInteractionUpdateDto {
  @IsOptional()
  @IsString()
  nome: string;
  @IsOptional()
  @IsString()
  descricao: string;
  @IsOptional()
  @IsString()
  farmaco1: string;
  @IsOptional()
  @IsString()
  farmaco2: string;
}
