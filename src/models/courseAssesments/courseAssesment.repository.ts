import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { CourseAssessment } from 'src/models/courseAssesments/courseAssesment.schema';

@Injectable()
export class CourseAssessmentRepository extends AbstractRepository<CourseAssessment> {
  constructor(
    @InjectModel(CourseAssessment.name) courseAssessmentModel: Model<CourseAssessment>,
  ) {
    super(courseAssessmentModel);
  }
}