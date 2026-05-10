import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CourseAssessment extends Document {
  // المفتاح اللي بيربط التكليف بالمادة
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({type: String, required: true })
  title: string; // Assignment 1

  @Prop({ type: String, required: true, enum: ['ASSIGNMENT', 'QUIZ', 'MIDTERM', 'FINAL'] })
  type: string;

  @Prop({ type: Number, required: true ,default: 0,max:25 })
  maxGrade: number; // 25
}

export const CourseAssessmentSchema = SchemaFactory.createForClass(CourseAssessment);