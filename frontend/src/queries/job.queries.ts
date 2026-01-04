import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "../services/job.service";
import type { JobFormInput } from "../types/jobTypes";

export const useCreateJob = () => {
    return useMutation({
        mutationFn: (data: JobFormInput) => createJob(data),
        // onSuccess: (response) => {
           
        // }
    })
};