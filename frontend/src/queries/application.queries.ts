import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyApplications, submitApplication } from "../services/application.service";
import type { ApplicationStatus } from "../types/applicationTypes";

export const useSubmitApplication = (jobId: string) => {
    return useMutation({
        mutationFn: (coverLetter?: File) => submitApplication(jobId, coverLetter)
    });
};

export const useGetMyApplications = (status?: ApplicationStatus) => {
    return useQuery({
        queryKey: ['myApplications', status],
        queryFn: () => getMyApplications(status)
    })
}