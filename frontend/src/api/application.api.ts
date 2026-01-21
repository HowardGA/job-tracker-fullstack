import type { ApplicationStatus } from '../types/applicationTypes';
import api from './axios';

export const submitApplicationRequest = (jobId: string, coverLetter?: File) => {
    if (!coverLetter) {
        return api.post(`application/${jobId}`);
    }
    const formData = new FormData();
    formData.append('coverLetter', coverLetter);
    return api.post(`application/${jobId}`, formData);
};

export const getMyApplicationsRequest = (status?: ApplicationStatus) => {
    const statusQuery = status ? `/${status}` : '';
    return api.get(`application/candidate${statusQuery}`);
}

export const changeStatusRequest = (status: ApplicationStatus, applicationId: string) => {
    return api.patch(`/application/${applicationId}/status`, { status });
}

//Make the withdraw here

