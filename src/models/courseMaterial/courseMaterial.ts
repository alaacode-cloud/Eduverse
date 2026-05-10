import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CourseMaterialTypeEnum } from 'src/common/utiles/enum';

@Schema({ timestamps: true })
export class CourseMaterial  {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true }) // index: true يسرع البحث جداً
  courseId: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string; // Lecture 1 Slides

  @Prop({ type: String, enum: CourseMaterialTypeEnum })
  type: string;

  @Prop({ type: String})
  url: string;
}

export const CourseMaterialSchema = SchemaFactory.createForClass(CourseMaterial);