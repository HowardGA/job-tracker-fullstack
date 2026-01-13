import { getCVRequest, replaceCVRequest, uploadCVRequest } from "../api/cv.api";
import type { CVResponse } from "../types/cvTypes";

export const uploadCV = async (file: File): Promise<CVResponse> => {
    const { data } = await uploadCVRequest(file);
    return data;
};

export const getCV = async (): Promise<CVResponse> => {
    const {data} = await getCVRequest();
    return data;
}

export const replaceCV = async (file: File): Promise<CVResponse> => {
    const {data} = await replaceCVRequest(file);
    return data;
}