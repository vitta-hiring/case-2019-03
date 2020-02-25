import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class PrescriptionUpdateDto {
  @IsOptional()
  @IsString()
  id: number;
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
