import { UserRepository } from './../../models/user/user.repository';
import { Injectable ,ConflictException,InternalServerErrorException, UnauthorizedException, NotFoundException, BadRequestException} from '@nestjs/common';
import { SignInDTO, UserSignUpDto,StudentSignUpDto } from './dto/authDto';
import { compare, generateOTP, hashPassword } from 'src/common/utiles/helpers';
import { User } from 'src/models';
import { sendEmail } from 'src/common/utiles/email.utils';
import { TokenService } from 'src/common/service/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  // async usersignUp(signUpDto: UserSignUpDto) {
  //   const email = await this.userRepository.findByEmail(signUpDto.email)
  //   if (email) {
  //     throw new ConflictException('Email already exists, please use another email')
  //   }
    
  //   const otp = generateOTP(6)
    
  //   const emailSent = await sendEmail({
  //     to: signUpDto.email,
  //     from:'"Eduverse System" <no-reply@eduverse.com>',
  //     subject: 'Email Confirmation',
  //     html: `<h1>Welcome ${signUpDto.fullName}</h1><p>Please confirm your email using this OTP: ${otp}</p>`
  //   })
  //   if (!emailSent) {
  //     throw new InternalServerErrorException('Failed to send email, please try again')
  //   }
    
  //    const createdUser = await this.userRepository.create({
  //     fullName: signUpDto.fullName,
  //     email: signUpDto.email,
  //     password: await  hashPassword(signUpDto.password),
  //     phone : signUpDto.phone,
  //     gender: signUpDto.gender,
  //     isVerified: false,
  //     emailOtp: {
  //       code: otp,
  //       expiresAt: new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes
  //     }
  //   })
  //   const {  emailOtp, ...Obj } = JSON.parse(
  //     JSON.stringify(createdUser),
  //   );

  //   return Obj as User;
  // }
  
 async studentsignUp(signUpDto: StudentSignUpDto) {
    const email = await this.userRepository.findByEmail(signUpDto.email)
    if (email) {
      throw new ConflictException('Email already exists, please use another email')
    }
    
    const otp = generateOTP(6)
    
    const emailSent = await sendEmail({
      to: signUpDto.email,
      from:'"Eduverse System" <no-reply@eduverse.com>',
      subject: 'Email Confirmation',
      html: `<h1>Welcome ${signUpDto.fullName}</h1><p>Please confirm your email using this OTP: ${otp}</p>`
    })
    if (!emailSent) {
      throw new InternalServerErrorException('Failed to send email, please try again')
    }
    
     const createdUser = await this.userRepository.create({
      fullName: signUpDto.fullName,
      email: signUpDto.email,
      academicId: signUpDto.academicId,
      currentYear: signUpDto.currentYear,
      password: await  hashPassword(signUpDto.password),
      phone : signUpDto.phone,
      gender: signUpDto.gender,
      isVerified: false,
      emailOtp: {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes
      }
    })
    const {  emailOtp, ...Obj } = JSON.parse(
      JSON.stringify(createdUser),
    );

    return Obj as User;
  }


  async signIn(signInDTO: SignInDTO) {

  const user = await this.userRepository.findByEmail(signInDTO.email);
  
  if (!user || !(await compare(signInDTO.password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

   if (!user.isVerified) {
  const otp = generateOTP(6);

  const emailSent = await sendEmail({
      to: user.email,
      from:'"Eduverse System" <no-reply@eduverse.com>',
      subject: 'Login OTP Verification',
      html: `<h1>Hello ${user.fullName}</h1>
             <p>Your OTP is: <strong>${otp}</strong></p>
             <p>This OTP will expire in 10 minutes.</p>`,
    });

    if (!emailSent) {
      throw new InternalServerErrorException('Failed to send email, please try again');
    }
   await this.userRepository.Update({
        filter: { email: user.email },
        update: {
          emailOtp: {
            code: otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // fresh 10 minutes
          }
        }
      })
    throw new UnauthorizedException('You should confirm your email first, new OTP sent to your email')

   }
   if (!await compare(signInDTO.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials')
    }
  return this.tokenService.generateAuthTokens(user); //To DO Ask about token
  }

  async confirmEmail(email: string, otp: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (!user.emailOtp || user.emailOtp.expiresAt < new Date() || user.emailOtp.code !== otp) {
      throw new BadRequestException('OTP expired, request a new one')
    }

    await this.userRepository.Update({
      filter: { email },
      update: {
        $unset: { emailOtp: "" },
        isVerified: true
      }
    })

    return true
  }


  async resendOtp(email: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified')
    }

    const otp = generateOTP(6)

    const emailSent = await sendEmail({
      to: email,
      from:'"Eduverse System" <no-reply@eduverse.com>',
      subject: 'New OTP Request',
      html: `<h1>Hello ${user.fullName}</h1>
             <p>Your new OTP is: <strong>${otp}</strong></p>
             <p>This OTP will expire in 10 minutes.</p>`
    })

    if (!emailSent) {
      throw new InternalServerErrorException('Failed to send email, please try again')
    }

    await this.userRepository.Update({
      filter: { email },
      update: {
        emailOtp: {
          code: otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000) // fresh 10 minutes
        }
      }
    })
    return true
  }
 // To Do Ask abouy headers and refresh token
  async refreshToken(token: string) {
    const payload = this.tokenService.verify({
      token,
      options: { secret: process.env.JWT_REFRESH_SECRET }
    })
    const user = await this.userRepository.findById({ _id: payload._id })
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
     return this.tokenService.generateAuthTokens(user);
  }

  async forgotPassword(email: string) {

     const user = await this.userRepository.findByEmail(email)
    
     if (!user) {
       throw new NotFoundException('User not found')
     }

     const otp = generateOTP(6)
    
     const emailSent = await sendEmail({
       to: user.email,
       from: '"Eduverse System" <no-reply@eduverse.com>',
       subject: 'Reset Password',
       html: `<h1>Hello ${user.fullName}</h1> 
                  <p>Your reset password OTP is: <strong>${otp}</strong></p>
                  <p>This OTP will expire in 10 minutes.</p>`
     })

     if (!emailSent) {
       throw new InternalServerErrorException('Failed to send email, please try again')
     }

     await this.userRepository.Update({
       filter: { email: email },
       update: {
         emailOtp: {
           code: otp,
           expiresAt: new Date(Date.now() + 10 * 60 * 1000)
         }
       }
    })

  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    if (!user.emailOtp || user.emailOtp.expiresAt < new Date() || user.emailOtp.code !== otp) {
      throw new BadRequestException('OTP expired, request a new one')
    }

    const isSamePassword = await compare(newPassword, user.password)
    if (isSamePassword) {
      throw new BadRequestException('Your new password cannot be the same as the old password')
    }
    await this.userRepository.Update({
      filter: { email: email },
      update: {
        $unset: {
          emailOtp: ""
        },
        password: await hashPassword(newPassword)
      }
    })
    return true
  }
}