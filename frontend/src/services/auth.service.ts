import { loginRequest, currentUserRequest, logoutRequest, registerRequest } from "../api/auth.api";
import type { AuthResponse, LoginPayload, LogoutResponse, typeCurrentUser, RegisterPayload} from "../types/authTypes";

export const login = async (credentials: LoginPayload): Promise<AuthResponse> => {
    const { data } = await loginRequest(credentials);
    return data;
}

export const getCurrentUser = async (): Promise<typeCurrentUser> => {
    const user = await currentUserRequest();
    return user.data;
}

export const logout = async (): Promise<LogoutResponse> => {
    const {data} = await logoutRequest();
    return data;
}

export const register = async (credentials: RegisterPayload): Promise<AuthResponse> => {
    const {data} = await registerRequest(credentials);
    return data;
}

