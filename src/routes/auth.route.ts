import express from "express";
import { validate } from "../middlewares";
import { authController } from "../controllers";
import { authValidation } from "../validations";

const authRoute = express.Router();

authRoute.post(
    "/register",
    validate(authValidation.register),
    authController.register
);

export default authRoute;