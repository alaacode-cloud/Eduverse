import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentProfileRepository } from 'src/models/studentProfile/studentProfile.repository';
import {  PopulatedStudentProfile } from 'src/common/interfaces/IstudentProfile';
import { raw } from '@nestjs/mongoose';
@Injectable()
export class StudentProfileService {
  constructor(
    private readonly StudentProfileRepository: StudentProfileRepository,
  ) {}

  async getMyProfile(userId: string) {
    // 1. جلب الداتا المتداخلة من الريبو
    const rawProfile = await this.StudentProfileRepository.getFullProfile(userId);

    if (!rawProfile) {
      throw new NotFoundException('Student not found');
    }

    const profile = rawProfile as unknown as PopulatedStudentProfile;

    // 3. تسطيح الداتا (Flattening) عشان الـ Frontend ياخدها زي ما هي
    const formattedProfile = {
      // من StudentProfile
      id: rawProfile._id, // ID من اليوزر عشان نضمن التوافق
      academicId: rawProfile.academicId,
      department: rawProfile.department,
      academicYear: rawProfile.currentYear,
      gpa: rawProfile.gpa,
      completedCoursesCount: rawProfile.completedCoursesCount,
      totalCreditHours: rawProfile.totalCreditHours,
      currentEnrolledCourses: rawProfile.currentEnrolledCourses,
        // من User
      fullName: profile.userId.fullName,
      email: profile.userId.email,
      phone: profile.userId.phone,
      gender: profile.userId.gender,
      dateOfBirth: profile.userId.dateOfBirth
    };

    return formattedProfile;
  }
}