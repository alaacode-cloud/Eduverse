import { StudentProfile } from "src/models/studentProfile/studentProfile.schema";
import { User } from "src/models/user/user.schema";
//
export interface PopulatedStudentProfile extends Omit<StudentProfile, 'userId'> {
  userId: User; // هنا بنقول للتايب سكربت: لو حصل populate، اليوزر ده هيبقى كامل مش مجرد ID
}
