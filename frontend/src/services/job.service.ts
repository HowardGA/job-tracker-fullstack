import { createJobRequest, getAllJobsRequest, getSingleJobRequest } from "../api/job.api";
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