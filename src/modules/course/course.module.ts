import { Module } from '@nestjs/common';
import {  Course, CourseRepository, CourseSchema, User, UserModel, UserRepository } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';


@Module({
   imports: [
          // Load .env file and make it available globally
          MongooseModule.forFeature([{
               name: Course.name, schema: CourseSchema
          }, {
               name: User.name, schema: UserModel
          }]),
          
      ],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseRepository,
    JwtService,
    UserRepository,
    
],
    
})
export class CourseModule {}
