import { useGetAllJobs } from "../queries/job.queries";
import JobCard from "../components/JobCard";

interface JobListProps {
    selectedJobId: string | null;
    onSelect: (id:string) => void;
}

const JobsList = ({selectedJobId, onSelect} : JobListProps) => {
    const { data, isLoading, isError } = useGetAllJobs();

    if (isLoading) return <h3 className="text-neutral-400 p-6 animate-pulse">Loading jobs...</h3>;

    if (isError) return <h3 className="text-red-400 p-6">Error while loading jobs</h3>;

    const jobs = data?.job || [];
    if (jobs.length === 0) return <h3 className="text-neutral-500 p-6">No vacancies found.</h3>;

    return (
        <section className="flex flex-col gap-4 p-4">
            {jobs.map((job) => (
                <JobCard 
                    key={job.id} 
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    workplace={job.workplace}
                    worktype={job.type}
                    onSelected={onSelect}
                    jobDate={job.createdAt}
                    isSelected={selectedJobId === job.id}
                />
            ))}
        </section>
    );
};

export default JobsList;