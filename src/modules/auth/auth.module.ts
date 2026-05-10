import { TokenService } from './../../common/service/token.service';
import { UserRepository } from './../../models/user/user.repository';
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "../../models/user/user.schema";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";



@Module({
    imports: [
         // Load .env file and make it available globally
        MongooseModule.forFeature([{
             name: User.name, schema: UserSchema
        }]),
    ],
    controllers: [AuthController],
    providers: [AuthService,UserRepository,TokenService,JwtService]
})

export class AuthModule {}