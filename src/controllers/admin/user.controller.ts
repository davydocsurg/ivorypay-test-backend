import { Request, Response } from "express";
import { userService } from "../../services";
import { catchAsync } from "../../utils";
import { AuthRequest } from "../../types";

const fetchUsers = catchAsync(async (req: AuthRequest, res: Response) => {
    const users = await userService.fetchUsers(req.user.id);
    res.send({ users, message: "Users fetched successfully" });
});

const disableUser = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await userService.disableUser(email);
    res.send({ user, message: "User account disabled successfully" });
});

const enableUser = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await userService.enableUser(email);
    res.send({ user, message: "User account enabled successfully" });
});

const sendAdminInvitations = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const { emails, role = "admin" } = req.body;
        const { firstName, lastName, email, referralCode } = req.user;
        const name = firstName + " " + lastName;
        const message = await userService.sendInvitations(
            name,
            email,
            emails,
            referralCode,
            role
        );

        res.send({
            message,
        });
    }
);

export default {
    fetchUsers,
    disableUser,
    enableUser,
    sendAdminInvitations,
};
