import { Request, Response, NextFunction } from "express";
import { hashSync } from "bcrypt";
import { createUser, login as loginService } from "../services/authService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body;

        const hashedPassword = hashSync(password, 10);
        const {userWithoutPassword, token} = await createUser(
            firstName,
            lastName,
            email,
            hashedPassword,
            role
        );
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password
        } = req.body;
        const {userExists, token} = await loginService(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        res.status(201).json(userExists);
    } catch (error) {
        next(error);
    }
}

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logged Out'});
}

export const currentUser = async (req: Request, res: Response) => {
    res.json(req.user);
}