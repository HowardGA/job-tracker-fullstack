import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createJob, deleteJob, getAllJobs, getJob, getJobWithApplications, getMyJobs, toggleVisibility } from "../services/job.service";
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

export const useGetMyJobs = () => {
    return useQuery({
        queryKey: ['myJobs'],
        queryFn: () => getMyJobs()
    });
}

export const useGetJobWithApplicants = (jobId: string) => {
    return useQuery({
        queryKey: ['jobWApp'],
        queryFn: () => getJobWithApplications(jobId)
    });
}

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (jobId: string) => deleteJob(jobId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: (['job', response.job?.id])})
        }
    });
}

export const useToggleJobVisibility = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (jobId: string) => toggleVisibility(jobId),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['job', response.job?.id] });
            queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
        }
    });
}