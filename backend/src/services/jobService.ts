import prisma from "../config/prisma";
import { JobPayload } from "../types/jobTypes";
import { AppError } from "../middleware/errorHandler";

export const createVacancy = async (data: JobPayload) => {
    return await prisma.job.create({
        data: data
    });
};

export const getallVacancies = async () => {
    const jobs = await prisma.job.findMany({
        where: {
            isVisible: true
        }
    });
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
    return await prisma.job.delete({
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


export const myJobs = async (userId: string) => {
    const [jobs, totalJobs] = await prisma.$transaction([
        prisma.job.findMany({
            where:{
                employerId: userId
            },
            select: {
                id: true,
                title: true,
                company: true,
                location: true,
                workplace: true,
                type: true,
                createdAt: true,
                _count: {
                    select: {
                        applications: true 
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        }),

        prisma.job.count({
            where: {
                employerId: userId
            }
        })
    ]);

    return {jobs, totalJobs}
};

export const getJobWithApplications = async (jobId: string) => {
    return await prisma.job.findUnique({
        where: {
            id: jobId
        },
         select: {
                id: true,
                title: true,
                company: true,
                location: true,
                workplace: true,
                type: true,
                createdAt: true,
                tasks: true,
                requirements: true,
                desirable: true,
                description: true,
                isVisible: true,
                applications: {
                    select: {
                        id: true,
                        status: true,
                        coverLetterUrl: true,
                        createdAt: true,
                        candidate: {
                            select: {
                                firstName: true,
                                lastName: true,
                                cvUrl: true,
                                email: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
        },
    })
};

export const toggleVisibility = async (jobId: string) => {
    const visivility = await prisma.job.findUnique({
        where: {
            id: jobId
        },
        select: {
            isVisible: true
        }
    });

    const job = await prisma.job.update({
        where: {
            id: jobId
        },
        data: {
            isVisible: !visivility?.isVisible
        }
    });
    return job;
}
