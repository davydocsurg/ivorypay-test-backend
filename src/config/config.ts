import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid("production", "development", "test")
            .required(),
        PORT: Joi.number().default(8080),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description("minutes after which access tokens expire"),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description("days after which refresh tokens expire"),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("minutes after which reset password token expires"),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("minutes after which verify email token expires"),
        SMTP_HOST: Joi.string().description("server that will send the emails"),
        SMTP_PORT: Joi.number().description(
            "port to connect to the email server"
        ),
        SMTP_USERNAME: Joi.string().description("username for email server"),
        SMTP_PASSWORD: Joi.string().description("password for email server"),
        EMAIL_FROM: Joi.string().description(
            "the from field in the emails sent by the app"
        ),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const cookieOptions = {
    expires: new Date(Date.now() + parseInt("90", 10) * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
};

const mailTrapOptions = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    secure: false,
};

const baseUrl =
    process.env.NODE_ENV === "development"
        ? "http://" + process.env.APP_HOST + ":" + process.env.APP_PORT
        : "https://ivorypay-test-backend.onrender.com";

const frontendUrl =
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? "http://localhost:5173"
        : "https://ivorypay-fullstack-test-frontend.vercel.app";

const systemMail = "noreply@ivorypay-test.com";

const DEVELOPMENT = "development";
const PRODUCTION = "production";
const TEST = "test";

const adminEmail = "admin@ivorypay-test.com";

const testReferralCode = "TESTREFERRALCODE";

const isTest = envVars.NODE_ENV === TEST;

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes:
            envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes:
            envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    cookieOptions,
    systemMail,
    email: {
        host: envVars.SMTP_HOST,
        port: envVars.SMTP_PORT,
        secure: envVars.SMTP_TTL,
        auth: {
            user: envVars.SMTP_USERNAME,
            pass: envVars.SMTP_PASSWORD,
        },
        debug: true,
        from: envVars.EMAIL_FROM,
    },
    baseUrl,
    mailTrapOptions,
    DEVELOPMENT,
    PRODUCTION,
    TEST,
    adminEmail,
    testReferralCode,
    isTest,
    frontendUrl,
};
