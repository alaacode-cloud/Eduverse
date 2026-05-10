import { StudentProfileRepository } from "src/models/studentProfile/studentProfile.repository";
import { User } from "src/models/user/user.schema";

export interface PopulatedStudentProfile extends StudentProfileRepository {
  userId: User; // هنا بنقول للتايب سكربت: لو حصل populate، اليوزر ده هيبقى كامل مش مجرد ID
}