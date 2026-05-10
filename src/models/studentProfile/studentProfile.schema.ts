import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AcademicYearEnum } from 'src/common/utiles/enum';

@Schema({ timestamps: true })
export class StudentProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId; // Reference to the User document

  @Prop({ type: String, required: true, unique: true })
  academicId: string; // #ST-2022-1

  @Prop({ type: Number, required: true, enum: AcademicYearEnum })
  currentYear: number; // 4 (Senior)

  // الإحصائيات الأكاديمية
  @Prop({ type: Number, default: 0 })
  gpa: number; 

  @Prop({ type: Number, default: 0 })
  completedCoursesCount: number; 

  @Prop({ type: Number, default: 0 })
  totalCreditHours: number; //3

  // المواد الحالية
  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] , maxlength:3 }) 
  currentEnrolledCourses: Types.ObjectId[];//3
}

export const StudentProfileSchema = SchemaFactory.createForClass(StudentProfile);