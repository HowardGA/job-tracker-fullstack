import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createJob, getAllJobs, getJob } from "../services/job.service";
import type { JobFormInput } from "../types/jobTypes";

export const useCreateJob = () => {
    return useMutation({
        mutationFn: (data: JobFormInput) => createJob(data),
        // onSuccess: (response) => {
           
        // }
    })
};

export const useGetAllJobs = () => {
    return useQuery({
        queryKey: ['allJobs'],
        queryFn: () => getAllJobs(),
    });
}

export const useGetSingleJob = (id: string) => {
    return useQuery({
        queryKey: ['job', id],
        queryFn: () => getJob(id)
    });
}