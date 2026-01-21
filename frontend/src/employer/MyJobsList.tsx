import { useGetMyJobs } from "../queries/job.queries"; 
import JobCard from "../components/JobCard";

interface MyJobListProps {
    selectedJobId: string | null;
    onSelect: (id:string) => void;
}

const MyJobsList = ({selectedJobId, onSelect} : MyJobListProps) => {
    const { data, isLoading, isError } = useGetMyJobs();

    if (isLoading) return <h3 className="text-neutral-400 p-6 animate-pulse">Loading jobs...</h3>;

    if (isError) return <h3 className="text-red-400 p-6">Error while loading jobs</h3>;

    const jobs = data?.jobs || [];
    if (jobs.length === 0) return <h3 className="text-neutral-500 p-6">No jobs found.</h3>;

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
                    numberOfApplications={job._count?.applications || 0}
                />
            ))}
        </section>
    );
};

export default MyJobsList;