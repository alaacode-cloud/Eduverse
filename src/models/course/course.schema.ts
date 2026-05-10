import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AcademicYearEnum } from 'src/common/utiles/enum';


@Schema({ timestamps: true })
export class Course  {

  @Prop({type: String, required: true, unique: true })
  code: string; // CS-402  ==> (4 --> refers to course level, 2 --> refers to track number)

  @Prop({type: String, required: true })
  name: string; // Advanced Machine Learning

  @Prop({type: String, required: true })
  description: string;

  @Prop({type: Number, required: true })
  creditHours: number;
  
  @Prop({ type: Number, required: true, min: 1, max: 2 })
  //@IsInt() 
  //@Min(1)  
  //@Max(2)// to do    =====   Validation قبل ما يوصل للداتابيز  
  semester: number;
  
  
  // Relations
  // المادة مرتبطة بـ "بروفايل الدكتور" مش بحساب الدخول (اليوزر)
  @Prop({ type: Types.ObjectId, ref: 'ProfessorProfile', required: true })
  professorId: Types.ObjectId;

  @Prop({ type: Number, required: true, enum: AcademicYearEnum ,default:1 })
  year: number; // السنة

}


export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.virtual('materials', {
  ref: 'CourseMaterial',
  localField: '_id',
  foreignField: 'courseId',
});

CourseSchema.virtual('assessments', {
  ref: 'CourseAssessment',
  localField: '_id',
  foreignField: 'courseId',
});

// مهم جداً عشان الـ JSON يرجع الـ Virtuals
CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true });