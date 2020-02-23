import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class PrescriptionCreateDto {
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsArray()
  medicines: number[];
  @IsNotEmpty()
  @IsNumber()
  patient: number;
}
