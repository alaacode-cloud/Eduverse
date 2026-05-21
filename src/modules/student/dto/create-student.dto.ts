import { AcademicYearEnum } from "@utils/enum";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateStudentDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  academicId: string; // #ST-2022-1

  @IsEnum(AcademicYearEnum)
  currentYear: AcademicYearEnum; // 4 (Senior)

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:// password cannt be sequence of numbers or letters 
      'password must be at least 8 characters long and contain at least one letter and one number',
  })//!test
  password: string;

}