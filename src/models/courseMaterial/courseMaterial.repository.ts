import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { CourseMaterial} from 'src/models/courseMaterial/courseMaterial'; 
import { Course } from '../course/course.schema';

@Injectable()
export class CourseMaterialRepository extends AbstractRepository<CourseMaterial> {
  constructor(
    @InjectModel(CourseMaterial.name) courseMaterialModel: Model<CourseMaterial>,
  ) {
    super(courseMaterialModel);
  }
}