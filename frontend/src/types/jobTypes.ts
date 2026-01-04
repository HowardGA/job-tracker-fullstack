import {z} from 'zod';

type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE';
export const jobTypesArray = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'];
export const workplaceArray = ['ONSITE', 'REMOTE', 'HYBRID'];

export const jobSchema = z.object({
    title: z.string().min(8, 'Title must be at lest 8 characters'),
    company: z.string().min(2, 'Company name must be at lest 2 characters'),
    location: z.string().min(8, 'Title must be at lest 8 characters'),
    type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'], {
        message: 'Please select a valid job type'
    }),
    workplace: z.enum(['ONSITE', 'REMOTE', 'HYBRID'], {
        message: 'Please select a valid workplace type'
    }),
    description: z.string().max(2000, 'Description must be less than 2000 characters'),
    requirements: z.string().max(1000, 'Requirements must be less than 1000 characters'),
    desirable: z.string().max(1000, 'Desirable must be less than 1000 characters'),
    tasks: z.string().max(1000, 'Tasks must be less than 1000 characters'),
    employerId: z.string().min(1, "Employer ID is required")
});

export type JobFormInput = z.infer<typeof jobSchema>;
export type Job  = JobFormInput & {
    id: string;
    createdAt: string;
}

export type JobResponse = {
    message?: string,
    job?: Job
}

