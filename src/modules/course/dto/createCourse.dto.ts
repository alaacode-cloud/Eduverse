import { AcademicYearEnum, SemesterEnum } from '@utils/enum';
import { IsString, IsNumber, IsEnum, Min } from 'class-validator';

export class CreateCourseDto {
  
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  @IsEnum(AcademicYearEnum)
  academicYear: AcademicYearEnum;

  @IsEnum(SemesterEnum)
  Semester: SemesterEnum;
  
  @IsString()
  description:string

  @IsNumber()
  @Min(1)
  creditHours: number;

}