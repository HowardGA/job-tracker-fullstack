import type { ApplicationStatus } from "../types/applicationTypes";

export const getStatusStyles = (status: ApplicationStatus) => {
        switch (status) {
            case "APPLIED": return "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20";
            case "UNDER_REVIEW": return "bg-violet-500/10 text-violet-500 border-violet-500/20";
            case "SHORT_LISTED": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "INTERVIEWING": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "OFFER_EXTENDED": return "bg-teal-500/10 text-teal-500 border-teal-500/20";
            case "HIRED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "NOT_SELECTED": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "WITHDRAWN": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
            default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        }
    };