import { createJobRequest } from "../api/job.api";
import type { JobFormInput, JobResponse } from "../types/jobTypes";

export const createJob = async (jobPayload: JobFormInput): Promise<JobResponse> => {
    const { data } = await createJobRequest(jobPayload);
    return data;
}