import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { jobSchema, type JobFormInput, jobTypesArray, workplaceArray } from "../types/jobTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalizeFirsLetter, replaceUnderscoreWithSpace } from "../utils/Strings";
import { useAuth } from "../app/providers/AuthProvider";
import { useCreateJob } from "../queries/job.queries";

const JobForm = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: {errors}} = useForm<JobFormInput>({
        resolver: zodResolver(jobSchema),
        values: {
            title: '',
            company: '',
            location: '',
            type: 'FULL_TIME',
            workplace: 'ONSITE',
            description: '',
            requirements: '',
            desirable: '',
            tasks: '',
            employerId: user?.id || ''
        }
    });
    const createJobMutation = useCreateJob(); 

    const onSubmit = (data: JobFormInput) => {
        toast.promise(createJobMutation.mutateAsync(data),{
            loading: 'Posting Vacancy...',
            success: 'Posted Vacancy!',
            error: (error) => error
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Title</label>
                <input 
                    {...register('title')}
                    placeholder="Job Title"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.title && <p className="text-xs text-red-400 mt-1 ml-1">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Company</label>
                <input 
                    {...register('company')}
                    placeholder="Company name"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.company && <p className="text-xs text-red-400 mt-1 ml-1">{errors.company.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Location</label>
                <input 
                    {...register('location')}
                    placeholder="Company name"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.location && <p className="text-xs text-red-400 mt-1 ml-1">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Job Type</label>
                <select 
                    {...register('type')}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                >
                    <option value='' hidden selected disabled>Select a Job Type</option>
                    {jobTypesArray.map((type, idx) => (
                        <option key={idx} value={type}>{capitalizeFirsLetter(replaceUnderscoreWithSpace(type))}</option>
                    ))}
                </select>
                {errors.type && <p className="text-xs text-red-400 mt-1 ml-1">{errors.type.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Workplace</label>
                <select 
                    {...register('workplace')}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                >
                    <option value='' hidden selected disabled>Select Workplace</option>
                    {workplaceArray.map((workplace, idx) => (
                        <option key={idx} value={workplace}>{capitalizeFirsLetter(workplace)}</option>
                    ))}
                </select>
                {errors.workplace && <p className="text-xs text-red-400 mt-1 ml-1">{errors.workplace.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Description</label>
                <textarea 
                    {...register('description')}
                    placeholder="Describe the Vacancy"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.description && <p className="text-xs text-red-400 mt-1 ml-1">{errors.description.message}</p>}
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Requirements</label>
                <textarea 
                    {...register('requirements')}
                    placeholder="List the Requirements"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.requirements && <p className="text-xs text-red-400 mt-1 ml-1">{errors.requirements.message}</p>}
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Desireble Qualities</label>
                <textarea 
                    {...register('desirable')}
                    placeholder="List the Desirable Qualities"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.desirable && <p className="text-xs text-red-400 mt-1 ml-1">{errors.desirable.message}</p>}
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Tasks</label>
                <textarea 
                    {...register('tasks')}
                    placeholder="List the General Tasks"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.tasks && <p className="text-xs text-red-400 mt-1 ml-1">{errors.tasks.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full mt-4 rounded-xl px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20 transform active:scale-[0.98] transition-all duration-150"
            >
                Post Vacancy
            </button>
        </form>
    );
};

export default JobForm;