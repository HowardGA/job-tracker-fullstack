import { getUserDataRequest } from "../api/user.api";
import type { UserResponse } from "../types/userType";


export const getUserData = async (): Promise<UserResponse> => {
    const {data} = await getUserDataRequest();
    return data;
}