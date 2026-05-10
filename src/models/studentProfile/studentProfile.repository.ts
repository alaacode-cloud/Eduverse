import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import{ StudentProfile } from './studentProfile.schema';

@Injectable()
export class StudentProfileRepository extends AbstractRepository<StudentProfile> {
  constructor(
    @InjectModel(StudentProfile.name) studentProfileModel: Model<StudentProfile>,
  ) {
    super(studentProfileModel);
  }

  // دالة جيبنا البروفايل مع دمج بيانات اليوزر جوه
  async getFullProfile(userId: string) {//test
    return await this.model
      .findOne({ userId })
      .populate('userId') // السحر هنا: جيبلي بيانات اليوزر المرتبط
      .lean()
      .exec();
  }

    // دالة تجيب بيانات الطالب الأساسية عشان نعرف سنه وتخصصه
  async findByUserId(userId: string) {
    return await this.model.findOne({ userId }).lean().exec();
  }
}