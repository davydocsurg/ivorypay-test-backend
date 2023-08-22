import express from "express";
import { auth, validate } from "../middlewares";
import { authController } from "../controllers";
import { authValidation } from "../validations";

const authRoute = express.Router();

authRoute.post(
    "/register?:referralCode",
    validate(authValidation.register),
    authController.register
);
authRoute.post("/login", validate(authValidation.login), authController.login);
authRoute.get("/test-auth", auth, authController.testA);

export default authRoute;
