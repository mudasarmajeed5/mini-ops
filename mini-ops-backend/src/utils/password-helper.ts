import bcrypt from "bcryptjs";
import env from "../../env.ts";
export const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};
export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(password, hashedPassword);
};
