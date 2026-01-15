import JobCard from "../components/JobCard";
import { useGetMyApplications } from "../queries/application.queries";

interface MyApplicationsListProps {
    selectedJobId: string | null;
    onSelect: (id:string) => void;
}

const MyApplicationsList = ({selectedJobId, onSelect} : MyApplicationsListProps) => {
    const { data, isLoading, isError } = useGetMyApplications();

    if (isLoading) return <h3 className="text-neutral-400 p-6 animate-pulse">Loading jobs...</h3>;

    if (isError) return <h3 className="text-red-400 p-6">Error while loading applications</h3>;

    const applications = data?.applications || [];
    if (applications.length === 0) return <h3 className="text-neutral-500 p-6">You haven't applied to any jobs yet.</h3>;

    return (
        <section className="flex flex-col gap-4 p-4">
             <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
            {applications.map((application) => (
                <JobCard 
                    key={application.id} 
                    id={application.job?.id || ''}
                    title={application.job?.title || 'Untitled Job'}
                    company={application.job?.company || 'Unknown Company'}
                    location={application.job?.location || 'Unknown Location'}
                    workplace={application.job?.workplace || 'ONSITE'}
                    worktype={application.job?.type || 'FULL_TIME'}
                    onSelected={onSelect}
                    jobDate={application.createdAt}
                    isSelected={selectedJobId === application.job?.id}
                    status={application.status}
                />
            ))}
        </section>
    );
};

export default MyApplicationsList;