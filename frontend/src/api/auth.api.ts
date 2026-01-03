import api from "./axios";
import type { typeCurrentUser, AuthResponse, LoginPayload, RegisterPayload, LogoutResponse } from "../types/authTypes";

export const loginRequest = (data: LoginPayload) => {
    return api.post<AuthResponse>('/auth/login', data);
};

export const currentUserRequest = () => {
    return api.get<typeCurrentUser>('/auth/current-user');
};

export const logoutRequest = () => {
    return api.post<LogoutResponse>('/auth/logout');
};

export const registerRequest = (data: RegisterPayload) => {
    return api.post<AuthResponse>('/auth/register', data);
}