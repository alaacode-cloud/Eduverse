import { Controller, Get, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { StudentProfileService } from './studentProfile.service';
//import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'; // حGuard بتاعك

@Controller('students/profile')
//@UseGuards(JwtAuthGuard) // متأكد إن الطالب بس اللي يدخل
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMyProfile(@Req() req: any) {
    // 
    // req.user ده بييجي من الـ JWT Strategy
    // لما الـ Token btتفك، بتطلع الـ payload فيها الـ userId
    // (ملاحظة: لو في الـ Strategy استخدمت sub، هتبقى req.user.sub. لو استخدمت _id هتبقى req.user._id)
    const userId = req.user._id; 

    return this.studentProfileService.getMyProfile(userId);
  }
}