import prisma from "../config/prisma";
import { ApplicationStatus } from "@prisma/client";

export const createApplication = async (candidateId: string, jobId: string, coverLetterUrl?: string) => {
    await prisma.application.create({
        data: {
            candidateId,
            jobId,
            status: "APPLIED",
            coverLetterUrl,
        }
    });
};

export const getAllApplicationsByCandidate = async (candidateId: string, status?: ApplicationStatus) => {
    const [applications, totalApplications] = await prisma.$transaction([
        prisma.application.findMany({
            where: { 
                candidateId,
                status
            },
            select: {
                id: true,
                status: true,
                createdAt: true,
                job: {
                    select: {
                        id: true,
                        title: true,
                        company: true,
                        location: true,
                        workplace: true,
                        type: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc' 
            }
        }),
        prisma.application.count({
            where: {
                candidateId,
                status
            }
        })
    ]);

    return { applications, totalApplications};
};

export const getApplicationByCandidateByJob = async (candidateId: string, jobId: string) => {
    return await prisma.application.findUnique({
        where: {
            jobId_candidateId: {
                candidateId,
                jobId
            }
        }
    });
};

export const getAllApplicationsByJob = async (jobId: string, status?: ApplicationStatus) => {
    const [applications, totalApplications] = await prisma.$transaction([
        prisma.application.findMany({
            where: {
                jobId,
                status
            }
        }),
        prisma.application.count({
            where: {
                jobId,
                status
            }
        })
    ]);

    return { applications, totalApplications };
};

//add a soft delete for the job posting
export  const changeApplicationStatus = async (candidateId: string, jobId: string, status: ApplicationStatus) => {
    return await prisma.application.update({
        where: {
            jobId_candidateId: {
                candidateId,
                jobId
            }
        },
        data: {
            status
        }
    });
};


export const withdrawApplication = async (candidateId: string, jobId: string) => {
    await prisma.application.delete({
        where: {
            jobId_candidateId: {
                candidateId,
                jobId
            }
        }
    });
};


