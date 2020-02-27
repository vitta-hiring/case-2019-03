import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class MedicineCreateDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsOptional()
  @IsString()
  farmaco: string;
  @IsOptional()
  @IsArray()
  farmacos: number[];
  @IsOptional()
  @IsString()
  concentracao: string;
  @IsOptional()
  @IsString()
  unidade: string;
  @IsOptional()
  @IsString()
  tipoMedicamento: string;
  @IsOptional()
  @IsString()
  formaFarmaceutica: string;
  @IsOptional()
  @IsString()
  viaAdministracao: string;
  @IsOptional()
  @IsString()
  codigoATC: string;
  @IsOptional()
  @IsBoolean()
  usoInterno: boolean;
  @IsOptional()
  @IsBoolean()
  antimicrobiano: boolean;
  @IsOptional()
  @IsString()
  bula: string;
  @IsOptional()
  @IsString()
  portaria344: string;
  @IsOptional()
  @IsBoolean()
  controleEspecial: boolean;
  @IsOptional()
  @IsString()
  TISS: string;
  @IsOptional()
  @IsBoolean()
  MIP: boolean;
  @IsOptional()
  @IsString()
  label: string;
  @IsOptional()
  @IsString()
  unificado: string;
  @IsOptional()
  @IsArray()
  prescriptions: number[];
}
