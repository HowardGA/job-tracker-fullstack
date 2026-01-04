import { createVacancy, deleteVacancy, getallVacancies, getVacancy, updateVacancy } from "../services/jobService";
import { Request, Response, NextFunction } from "express";
import { JobPayload } from "../types/jobTypes";
import { AppError } from "../middleware/errorHandler";

export const CreateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: JobPayload = req.body; 
        if (!data.title || !data.employerId || !data.company || !data.description || !data.desirable || !data.employerId || !data.location || !data.requirements || !data.tasks || !data.workplace || !data.type) {
            const error: AppError = new Error("Missing required fields");
            error.status = 400;
            return next(error);
        }
        const job = await createVacancy(data);
        res.status(201).json({
            message: 'Vacancy Posted',
            job: job
        });
    } catch (error) {
        next(error);
    }
};

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await getallVacancies();
        res.status(200).json({job: jobs});
    } catch (error) {
        next(error);
    }
}

export const getJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const job = await getVacancy(id);
        res.status(200).json({job});
    } catch (error) {
        next(error);
    }
}

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await deleteVacancy(id);
        res.status(200).json({message: "Vacancy Deleted"});
    } catch (error) {
        next(error);
    }
}

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const updateData: Partial<JobPayload> = req.body;

        const updatedJob = await updateVacancy(id, updateData);
        res.status(200).json({
            message: "Vacancy updated successfully",
            job: updatedJob
        });
    } catch (error) {
        next(error);
    }
}