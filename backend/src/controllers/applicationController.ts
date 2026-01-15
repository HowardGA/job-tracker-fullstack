import { ApplicationStatus } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import { createApplication, getAllApplicationsByCandidate, getApplicationByCandidateByJob, getAllApplicationsByJob, changeApplicationStatus, withdrawApplication } from "../services/applicationService";
import { uploadCoverLetter } from "../middleware/storageHandle";

export const getCandidateApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const candidateId = req.user?.userId || '';
        const status = req.query.status as ApplicationStatus | undefined;

        const { applications, totalApplications } = await getAllApplicationsByCandidate(candidateId, status);

        res.status(200).json({ applications, totalApplications });
    } catch (error) {
        next(error);
    };
};

export const submitApplication = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const candidateId = req.user?.userId || '';
        const jobId = req.params.jobId;
        const coverLetter = req.file;
        let coverLetterPath: string | undefined;

        if (coverLetter) {
            coverLetterPath = await uploadCoverLetter(coverLetter, candidateId);
        }

        await createApplication(candidateId, jobId, coverLetterPath);

        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        next(error);
    }
};

export const getCandidateApplicationByJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const candidateId = req.user?.userId || '';
        const jobId = req.params.jobId;

        const application = await getApplicationByCandidateByJob(candidateId, jobId);

        res.status(200).json({ application });
    } catch (error) {
        next(error);
    }
}

export const getCandidatesApplicationsByjob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.jobId;

        const applications = await getAllApplicationsByJob(jobId);

        res.status(200).json({ applications });
    } catch (error) {
        next(error);
    }
};

export const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.params.candidateId;
        const { status } = req.body;

        await changeApplicationStatus(candidateId, jobId, status);

        res.status(200).json({ message: 'Application status updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const withdraw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const candidateId = req.user?.userId || '';
        const jobId = req.params.jobId;

        await withdrawApplication(candidateId, jobId);

        res.status(200).json({ message: 'Application withdrawn successfully' });
    } catch (error) {
        next(error);
    }
}