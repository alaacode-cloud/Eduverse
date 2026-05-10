import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  NotFoundException, 
  UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

// Make sure to import your specific UserRepository and PUBLIC constant/metadata key
// import { UserRepository } from './user.repository'; 
// import { PUBLIC } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: any, // Replace 'any' with your actual UserRepository type
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is decorated as public
    const publicVal = this.reflector.get('PUBLIC', context.getHandler()); // Used string 'PUBLIC' here, replace with your constant if needed

    if (publicVal) return true;

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    try {
      // NOTE: Standard practice often requires splitting 'Bearer <token>'. 
      // If your client sends "Bearer <token>", use: authorization.split(' ')[1] instead of authorization directly.
      const payload = this.jwtService.verify<{
        _id: string;
        role: string;
        email: string;
      }>(authorization, {
        secret: this.configService.get('access').jwt_secret,
      });

      const userExist = await this.userRepository.getOne({
        _id: payload._id,
      });

      if (!userExist) throw new NotFoundException('user not found');

      request.user = userExist;
      return true;
      
    } catch (error) {
      // Catch JWT verification errors (like token expiration) to prevent unhandled rejections
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}