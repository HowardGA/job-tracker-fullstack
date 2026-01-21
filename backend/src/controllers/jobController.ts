import { createVacancy, deleteVacancy, getallVacancies, getJobWithApplications, getVacancy, myJobs, toggleVisibility, updateVacancy } from "../services/jobService";
import { Request, Response, NextFunction, application } from "express";
import { JobPayload } from "../types/jobTypes";
import { AppError } from "../middleware/errorHandler";
import { getPrivateCLUrl, getPrivateCVUrl } from "../middleware/storageHandle";

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
        const job = await deleteVacancy(id);
        res.status(200).json({message: "Vacancy Deleted", job});
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

export const getMyJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId || '';

        const {jobs, totalJobs} = await myJobs(userId);

        res.status(200).json({jobs, totalJobs});
    } catch (error) {
        next(error);
    }
};

export const findJobWithApplicants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {jobId} = req.params;
        const job = await getJobWithApplications(jobId);

        if (!job) return res.status(404).json({ message: "Job not found" });

        const applicationsWithUrls = await Promise.all(
            job.applications.map(async (application) => {
                
                const coverLetterUrl = application.coverLetterUrl 
                    ? await getPrivateCLUrl(application.coverLetterUrl) 
                    : null;

                const cvUrl = application.candidate.cvUrl 
                    ? await getPrivateCVUrl(application.candidate.cvUrl) 
                    : null;

                return {
                    id: application.id,
                    createdAt: application.createdAt,
                    status: application.status,
                    coverLetterUrl,
                    candidate: {
                        ...application.candidate,
                        cvUrl,
                    },
                };
            })
        );

        const jobsWithSignedURls = {
            ...job,
            applications: applicationsWithUrls
        }

        res.status(200).json({job: jobsWithSignedURls})
    } catch (error) {
        next(error)
    }
};

export const changeVisibility = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {jobId} = req.params;

        const job = await toggleVisibility(jobId);

        res.status(200).json({message: 'Visibility Changed!', job});
    } catch (error) {
        next(error);
    }
};