import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeStatus, getMyApplications, submitApplication } from "../services/application.service";
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
};

export const useChangeApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ status, applicationId }: { status: ApplicationStatus, applicationId: string }) => 
            changeStatus(status, applicationId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['jobWApp', variables.applicationId] });
        }
    });
};