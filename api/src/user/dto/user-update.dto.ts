import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsArray,
    IsEmail,
    IsEmpty,
    IsNumber,
  } from 'class-validator';
  
  export class UserUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsEmpty()
    emailToken?: string;
  
    @IsEmpty()
    emailTokenExpirationDate?: string;
  
    @IsNotEmpty()
    password?: string;
  
    @IsEmpty()
    emailIsVerified?: boolean;
  
    @IsOptional()
    @IsArray()
    prescriptions?: number[];
  }