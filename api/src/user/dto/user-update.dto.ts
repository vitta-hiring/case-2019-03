import {
    IsNotEmpty,
    IsString,
    IsOptional,
    ValidateIf,
    IsArray,
    IsEmail,
    IsPhoneNumber,
    IsEmpty,
    Allow,
  } from 'class-validator';
  
  export class UserUpdateDto {
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
    prescriptions?: Array<{ id: string }>;
  }