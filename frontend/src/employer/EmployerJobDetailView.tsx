import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import JobInfoContent from "../components/JobInfoContent";
import { useGetJobWithApplicants } from "../queries/job.queries";
import type { ApplicationForEmployer } from "../types/applicationTypes";

const EmployerJobDetailView = ({ id }: { id: string }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'applicants'>('info');
    const { data, isLoading } = useGetJobWithApplicants(id); 

    if (isLoading) return <div className="text-neutral-400 p-6 animate-pulse">Loading Employer View...</div>;
    console.log(data)

    return (
        <section className="w-full h-full bg-neutral-900/40 p-8 overflow-y-auto custom-scrollbar">
            <div className="flex gap-4 mb-8 border-b border-neutral-800">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`pb-4 px-2 font-bold transition-all ${activeTab === 'info' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-neutral-500'}`}
                >
                    Job Info
                </button>
                <button 
                    onClick={() => setActiveTab('applicants')}
                    className={`pb-4 px-2 font-bold transition-all ${activeTab === 'applicants' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-neutral-500'}`}
                >
                    Applicants ({data?.job?.applications?.length || 0})
                </button>
            </div>

            {activeTab === 'info' && data?.job ? (
                <JobInfoContent details={data?.job} showControls/>
            ) : (
                <div className="space-y-4">
                    {data?.job?.applications.map((app: ApplicationForEmployer) => (
                        <ApplicantRow key={app.id} application={app} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default EmployerJobDetailView;