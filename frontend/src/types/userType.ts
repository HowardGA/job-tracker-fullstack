import type { User } from "./authTypes";
import type { Job } from "./jobTypes";

export type ApplicationStatus =  "APPLIED" | "UNDER_REVIEW" | "SHORT_LISTED" | "NOT_SELECTED" | "INTERVIEWING" | "OFFER_EXTENDED" | "HIRED" | "WITHDRAWN";

export interface UserResponse {
    message?: string;
    user?:  UserData;
}

export interface Application {
  id:string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus
  coverLetterUrl: String;
  createdAt: string
} 

export interface UserData extends User{
    jobs?: Job[];
    applied?: Application[]; 
}
