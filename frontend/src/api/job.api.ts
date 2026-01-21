import api from "../api/axios";
import type { JobFormInput } from "../types/jobTypes";

export const createJobRequest = (jobPayload: JobFormInput)=> {
    return api.post('/job/', jobPayload); 
}

export const getAllJobsRequest = () => {
    return api.get('/job');
}

export const getSingleJobRequest = (id:string) => {
    return api.get(`/job/${id}`);
}

export const getMyJobsRequest = () => {
    return api.get('/job/my-jobs/');
}

export const getJobWithApplicationsRequest = (jobId: string) => {
    return api.get(`/job/applications/${jobId}`);
}

export const deleteJobRequest = (jobId: string) => {
    return api.delete(`/job/${jobId}`);
}

export const toggleVisibilityRequest = (jobId: string) => {
    return api.patch(`/job/toggleVisibility/${jobId}`);
}