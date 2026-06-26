import { jwtVerify, SignJWT, type JWTPayload as JoseJWTPayload } from "jose";
import { createSecretKey } from "crypto";
import env from "../../env.ts";

export interface JWTPayload extends JoseJWTPayload {
  id: string;
  email: string;
}
const secretKey = createSecretKey(Buffer.from(env.JWT_SECRET, "utf8"));

export const generateToken = (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(secretKey);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as unknown as JWTPayload;
};
