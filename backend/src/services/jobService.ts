import prisma from "../config/prisma";
import { JobPayload } from "../types/jobTypes";
import { AppError } from "../middleware/errorHandler";

export const createVacancy = async (data: JobPayload) => {
    return await prisma.job.create({
        data: data
    });
};

export const getallVacancies = async () => {
    const jobs = await prisma.job.findMany();
    return jobs;
};

export const getVacancy = async (id: string) => {
    const job = await prisma.job.findUnique({
        where: {
            id
        }
    });
    if(!job) {
        const error: AppError = new Error("Job not found");
        error.status = 404;
        throw error;
    }
    return job;
};

export const deleteVacancy = async (id: string) => {
    await prisma.job.delete({
        where: {
            id
        }
    });
};

export const updateVacancy = async (id: string, data: Partial<JobPayload>) => {
    return await prisma.job.update({
        where: {id},
        data: data
    });
};

