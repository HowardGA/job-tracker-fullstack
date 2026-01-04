import { Job } from "@prisma/client";

export type JobPayload = Omit<Job, 'id' | 'createdAt'>;