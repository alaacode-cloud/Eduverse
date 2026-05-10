import * as bcrypt from 'bcrypt';
import { customAlphabet } from "nanoid";


export const generateOTP = (length: number = 6): string => {
 const otp =customAlphabet('0123456789', length)()
  return otp;
}


export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const compare = async ( data: string, hashed: string,): Promise<boolean> => {
  return await bcrypt.compare(data, hashed)
}