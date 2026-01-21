import { changeStatusRequest, getMyApplicationsRequest, submitApplicationRequest } from "../api/application.api";
import type { ApplicationResponse, ApplicationStatus } from "../types/applicationTypes";

export const submitApplication = async (jobId: string, coverLetter?: File): Promise<ApplicationResponse> => {
    const {data} = await submitApplicationRequest(jobId, coverLetter);
    return data;
};

export const getMyApplications = async (status?: ApplicationStatus): Promise<ApplicationResponse> => {
    const {data} = await getMyApplicationsRequest(status);
    return data;
}

export const changeStatus = async (status: ApplicationStatus, candidateId: string): Promise<ApplicationResponse> => {
    const {data} = await changeStatusRequest(status, candidateId);
    return data;
}