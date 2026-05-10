import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { ProfessorProfile} from './professorProfile.schema';

@Injectable()
export class ProfessorProfileRepository extends AbstractRepository<ProfessorProfile> {
  constructor(
    @InjectModel(ProfessorProfile.name) professorProfileModel: Model<ProfessorProfile>,
  ) {
    super(professorProfileModel);
  }

  // دالة جيب البروفايل مع دمج بيانات اليوزر (نفس فكرة الطالب)
  async getFullProfile(userId: string) {
    return await this.model
      .findOne({ userId })
      .populate('userId') // جيب اسم الدكتور وإيميله من جدول اليوزر
      .populate('assignedCourses') // جيب تفاصيل المواد اللي بيدرسها
      .lean()
      .exec();
  }

  // دالة مفيدة: لما نيجي نربط مادة بدكتور في المستقبل
//   async findByUserId(userId: string) {
//     return await this.model.findOne({ userId }).lean().exec();
//   }
}