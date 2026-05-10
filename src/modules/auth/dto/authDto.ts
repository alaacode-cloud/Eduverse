import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, Matches, MinLength } from 'class-validator';
import { GenderEnum } from 'src/common/utiles/enum';

export class SignInDTO {
  @IsString()
  @IsNotEmpty() // email:""
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:// password cannt be sequence of numbers or letters 
      'password must be at least 8 characters long and contain at least one letter and one number',
  })//!test
  password: string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  recoveryEmail: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(010|011|012|015)[0-9]{8}$/)//!test
  phone: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(...) 
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}

export class ConfirmEmailDto {
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    otp:string;
}
  
export class ResendOtpDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;
}

export class forgotPasswordDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    recoveryEmail:string;
}   

export class resetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    recoveryEmail:string;
    
    @IsString()
    @IsNotEmpty()
    otp:string;

    @IsStrongPassword()
    @IsNotEmpty()
    newPassword:string;
}