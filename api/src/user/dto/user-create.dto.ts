import {
    IsNotEmpty,
    IsString,
    IsOptional,
    ValidateIf,
    IsArray,
    IsEmail,
    IsEmpty,
  } from 'class-validator';
  
  export class UserCreateDto {
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