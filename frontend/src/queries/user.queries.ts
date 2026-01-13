import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../services/user.service";

export const useGetUserData = () => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData()
    });
};