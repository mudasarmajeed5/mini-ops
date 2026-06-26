import z, { ZodError } from "zod";
import "dotenv/config";
const envSchema = z.object({
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().startsWith("postgresql://"),
  JWT_SECRET: z.string().min(32, "JWT Must be 32 Characters long"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  BCRYPT_ROUNDS: z.coerce
    .number()
    .positive()
    .min(12, "Minimum 12 required ")
    .max(20, "Salt rounds can't be more than 20")
    .default(12),
});

export type Env = z.infer<typeof envSchema>;
let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof ZodError) {
    console.log("Invalid Envionment Variables");
    console.log(JSON.stringify(z.flattenError(e).fieldErrors, null, 2));
    process.exit(1);
  }
  throw e;
}
export default env;
