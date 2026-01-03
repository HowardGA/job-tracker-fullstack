import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from '../services/auth.service';
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (user) => {
            queryClient.setQueryData(['currentUser'], user);
            navigate('/');
        },

    });
}

export const useCurrentUser = () => {
    return useQuery({
        queryKey:['currentUser'],
        queryFn: () => authService.getCurrentUser(),
        retry: false
    })
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: (data) => {
            queryClient.setQueryData(['currentUser'], null);
            queryClient.invalidateQueries();

            navigate('/');
        },
    })
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: (user) => {
            queryClient.setQueryData(['currentUser'], user);
            navigate("/");        
        },

    })
}