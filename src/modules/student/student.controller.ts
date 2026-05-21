import { Auth } from "@decorators/authDecorator";
import { Pagination } from "@decorators/pagination.decorator";
import type { IPagination } from "@decorators/pagination.decorator";
import { CurrentUser } from "@decorators/userDecorator";
import { User } from "@models/index";
import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { UserRolesEnum, AcademicYearEnum } from "@utils/enum";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentService } from "./student.service";

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Auth(UserRolesEnum.ADMIN)
  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Auth(UserRolesEnum.ADMIN)
  @Get()
  getAllStudents(
    @Pagination() pagination: IPagination,
    @Query('search') search?: string,        // عشان الـ Search Box
    @Query('year') year?: AcademicYearEnum){ 
    return this.studentService.getAllStudents(pagination, search, year);
  }

  @Auth(UserRolesEnum.STUDENT)
  @Get('courses')
  getEnrolledCourses(@CurrentUser() user: User) { 
  return this.studentService.getEnrolledCourses(user._id); 
  }

  @Auth(UserRolesEnum.ADMIN)
  @Get(':id')
  getStudentProfileById(@Param('id') id: string) {
    return this.studentService.getStudentProfileById(id);
  }

  @Auth(UserRolesEnum.ADMIN)
  @Patch(':id')
  updateStudentData(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudentData(id, updateStudentDto);
  }

  @Auth(UserRolesEnum.ADMIN)
  @Delete(':id')
  deleteStudentById(@Param('id') id: string) {
    return this.studentService.deleteStudentById(id);
  }

 
}


