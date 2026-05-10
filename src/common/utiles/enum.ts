export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum SemesterEnum {
  FIRST = 1,
  SECOND = 2,
  SUMMER = 3,
}

export enum StudentStatusEnum {
  ENROLLED = 'ENROLLED',
  DROPPED = 'DROPPED',
}
export enum AcademicYearEnum {
  YEAR_1 = 1,
  YEAR_2 = 2,
  YEAR_3 = 3,
  YEAR_4 = 4,
}

export enum UserRolesEnum {
  ADMIN = 'Admin',
  STUDENT = 'Student',
  PROFESSOR = 'Professor',
}

export enum GradeEnum {
  Aplus = 'A+',
  A = 'A',
  Amins = 'A-',
  Bplus = 'B+',
  B = 'B',
  Bmins = 'B-',
  Cplus = 'C+',
  C = 'C',
  Cmins = 'C-',
  Dplus = 'D+',
  D = 'D',
  Dmins = 'D-',
  F = 'F',
}

export enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female' 
}

export enum SummerReason {
  NONE = 'NONE',                 // لو أخدها في فصل عادي
  FAILURE = 'FAILURE',           // لو رسبهاوجاي ياخدها في الصيف (هيتطبق عليه الخصم)
  NON_REGISTRATION = 'NON_REGISTRATION', // لو ما سجلش فيها أصلاً (مفيش خصم)
}

export enum TermeEnum {
  First  = 'FIRST',
  Second = 'SECOND',
  Summer = 'SUMMER',
}
 
export enum TrackEnum {
  UI = 'UI',
  CYBERSECURITY = 'CYBERSECURITY',
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  MOBILE = 'MOBILE',
  AI = 'AI',
  DATA_ANALYSIS = 'DATA_ANALYSIS',
  NETWORK = 'NETWORK',
}

export enum GroupRoleEnum {
  GroupAdmin = 'GROUP_ADMIN',
  Member     = 'MEMBER',
}
  
//https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png  Prfile Picture URL
