import { createJobRequest, deleteJobRequest, getAllJobsRequest, getJobWithApplicationsRequest, getMyJobsRequest, getSingleJobRequest, toggleVisibilityRequest } from "../api/job.api";
import type { JobFormInput, JobResponse, JobResponseAll } from "../types/jobTypes";

export const createJob = async (jobPayload: JobFormInput): Promise<JobResponse> => {
    const { data } = await createJobRequest(jobPayload);
    return data;
}

export const getAllJobs = async (): Promise<JobResponseAll> => {
    const {data} = await getAllJobsRequest();
    return data;
} 

export const getJob = async (id:string): Promise<JobResponse> => {
    const {data} = await getSingleJobRequest(id);
    return data;
}

export const getMyJobs = async (): Promise<JobResponse> => {
    const {data} = await getMyJobsRequest();
    return data;
}

export const getJobWithApplications = async (jobId: string): Promise<JobResponse> => {
    const {data} = await getJobWithApplicationsRequest(jobId);
    return data;
}

export const deleteJob = async (jobId: string): Promise<JobResponse> => {
    const {data} = await deleteJobRequest(jobId);
    return data;
}

export const toggleVisibility = async (jobId: string): Promise<JobResponse> => {
    const {data} = await toggleVisibilityRequest(jobId);
    return data;
}