import { StatusEnum } from './../../common/utiles/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProfessorProfile extends Document {
  // الربط بحساب الدخول (اليوزر)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  // البيانات الأكاديمية للدكتور
  @Prop({type: String, required: true, enum: ['PROFESSOR',  'TEACHING_ASSISTANT'] })
  academicTitle: string; // Doctor, Professor, etc.

  @Prop({ default: 'INACTIVE', enum: StatusEnum })
  status: string;

  // المواد اللي الدكتور مسؤول عنها (يدرسها)
  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  assignedCourses: Types.ObjectId[];
}

export const ProfessorProfileSchema = SchemaFactory.createForClass(ProfessorProfile);