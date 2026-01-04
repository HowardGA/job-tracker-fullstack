import api from "../api/axios";
import type { JobFormInput } from "../types/jobTypes";

export const createJobRequest = (jobPayload: JobFormInput)=> {
    return api.post('/job/', jobPayload); 
}