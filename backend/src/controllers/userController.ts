import { Response, Request, NextFunction } from "express";
import { UserData } from "../services/userService";


export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId || '';
        const userRol = req.user?.role;

        const user = await UserData(userId, userRol);

        res.status(200).json({user: user});
    } catch (error) {
        next(error);
    }
} 