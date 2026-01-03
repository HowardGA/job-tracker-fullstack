import { z } from "zod";

export type UserRole = 'EMPLOYER' | 'CANDIDATE';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    cvUrl?: string | null;
    createdAt: string; 
}

export interface typeCurrentUser {
    id: string;
    name: string;
    role: UserRole;
}

// Form validation
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    role: z.enum(['EMPLOYER', 'CANDIDATE'], {
            message: "Please select a valid role"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


// infered types
export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormInputs = z.infer<typeof registerSchema>;

// Api payloads
export type RegisterPayload = Omit<RegisterFormInputs, 'confirmPassword'>;
export type LoginPayload = LoginFormInputs;

// Api responses
export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export type LogoutResponse = {
    message: string;
}

export type ErrorResponse = {
    message: string;
}


