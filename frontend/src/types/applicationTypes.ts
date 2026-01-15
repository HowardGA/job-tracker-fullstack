import zod from "zod";
import type { Job } from "./jobTypes";

export type ApplicationStatus = 'APPLIED' |
  'UNDER_REVIEW' |
  'SHORT_LISTED' |
  'NOT_SELECTED' |
  'INTERVIEWING' |
  'OFFER_EXTENDED' |
  'HIRED' |
  'WITHDRAWN';

export interface Application {
    id: string;
    jobId: string;
    coverLetterUrl: string;
    createdAt: string;
    status: ApplicationStatus
    job?: Job;
}

export interface ApplicationResponse {
    message?: string;
    application?: Application;
    applications?: Application[];
    totalApplications?: number;
}

export const ApplicationScheema = zod.object({
    coverLetter: zod
        .any()
        .optional() 
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return files.length === 1;
        }, "Please select exactly one file")
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return files[0]?.type === "application/pdf";
        }, "Only PDF files are allowed")
        .refine((files) => {
            if (!files || files.length === 0) return true;
            return files[0]?.size <= 5 * 1024 * 1024;
        }, "Max file size is 5MB")
});
export type ApplicationFormInput = zod.infer<typeof ApplicationScheema>;