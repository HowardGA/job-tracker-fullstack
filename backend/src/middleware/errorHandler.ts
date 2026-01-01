import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
    status?: number; 
}

export const errorHandler = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);
    res.status(error.status || 500).json({
        message: error.message || ' Internal Server Error'
    });
};