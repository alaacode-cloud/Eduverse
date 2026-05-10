import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusEnum, UserRolesEnum,GenderEnum } from 'src/common/utiles/enum';



@Schema({ timestamps: true }) // Adding createdAt,updatedAt to all users 
export class User {

  readonly _id: string;

  @Prop({ type: String,required: true })
  fullName: string;

  @Prop({ type: String ,required: true , unique: true})//UNI Email
  email: string;
  

  @Prop({type: String, required: true}) // select: false يعني مش بترجع في أي query عادية
  password: string;
  
  @Prop({type: String})
  phone: string;
  
  @Prop({type: String,enum:GenderEnum}) 
  gender: GenderEnum;

  @Prop({type: Date}) 
  dateOfBirth: Date; 

  @Prop({ type: String, enum: StatusEnum ,default: StatusEnum.INACTIVE })
  status: StatusEnum;

  @Prop({ type: String, default: "CS" })
  department: string; 
  
  @Prop({ type: String, enum: UserRolesEnum,required: true })
  role: UserRolesEnum;

  @Prop({
    type: {
      code: { type: String },
      expiresAt: { type: Date },
          },default: null,})
    emailOtp: {code: string ,expiresAt: Date} ;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);


//مكانها مش هنا في ال auth.module.ts عشان نستخدمها في ال repository

export const UserModel = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);
