import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_URL: process.env.CLIENT_URL,
} as const;

/*
  Validate required variables
*/

const missingEnv = Object.entries(ENV)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

if (missingEnv.length > 0) {
    console.error(
        `❌ Missing environment variables: ${missingEnv.join(", ")}`
    );
    process.exit(1);
}