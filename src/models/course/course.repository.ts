import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Course } from './course.schema';

@Injectable()
export class CourseRepository extends AbstractRepository<Course> {
  constructor(
    @InjectModel(Course.name) courseModel: Model<Course>,
  ) {
    super(courseModel);
  }

  async getSemesterCourses( year: number, semester: number) {
    return await this.model
      .find({ year, semester })
      .populate('professorId', 'fullName')
      // لما نحط كده، المونجووز هيشغل الـ Virtuals اللي عملناها في السكيما
      .populate('materials') 
      .populate('assessments')
      .exec();
  }
}