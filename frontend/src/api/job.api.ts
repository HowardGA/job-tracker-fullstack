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