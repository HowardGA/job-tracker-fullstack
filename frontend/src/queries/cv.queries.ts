import { useMutation, useQuery, type Enabled, type UseQueryOptions } from "@tanstack/react-query";
import { getCV, replaceCV, uploadCV } from "../services/cv.service";
import type { CVResponse } from "../types/cvTypes";

export const useUploadCV = (isEditing: boolean) => {
    return useMutation({
        mutationKey:['cvurl'],
        mutationFn: (file:File) => (isEditing) ? replaceCV(file) : uploadCV(file),
    });
};

export const useGetCV = (options?: Partial<UseQueryOptions<CVResponse,Error>>) => {
    return useQuery({
        queryKey: ['cvurl'],
        queryFn: () => getCV(),
        ...options
    });
}