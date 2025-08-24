import { z } from 'zod';

const envSchema = z.object({
  // CLERK AUTH

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),

  //    STREAM SDK

  NEXT_PUBLIC_STREAM_API_KEY: z.string(),
  STREAM_SECRET_KEY: z.string(),

  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const varName = issue.path[0];
      console.error(`\n❌ ${String(varName)} is required`);
    });

    console.error('\n💡 Add missing variables to .env');

    process.exit(1);
  }

  return result.data;
}

export const env = validateEnv();
