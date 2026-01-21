import { useState } from "react";
import JobsList from "../employer/JobsList";
import JobDetailView from "../employer/JobDetailView";
import MyApplicationsList from "../candidate/MyApplicationsList";
import MyJobsList from "../employer/MyJobsList";
import EmployerJobDetailView from "../employer/EmployerJobDetailView";

const Jobs = ({myApplications = false, myJobs = false} : {myApplications?: boolean, myJobs?: boolean}) => {
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    console.log(selectedJobId)
    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            <div className="w-full md:w-1/3 overflow-y-auto custom-scrollbar border-neutral-800">
                {myApplications ? (
                    <MyApplicationsList 
                        selectedJobId={selectedJobId}
                        onSelect={setSelectedJobId}
                    />
                ) : myJobs ? (
                    <MyJobsList 
                        selectedJobId={selectedJobId}
                        onSelect={setSelectedJobId}
                    />
                ) : (<JobsList 
                        selectedJobId={selectedJobId}
                        onSelect={setSelectedJobId}
                />)}
            </div>
            <div className="hidden md:block flex-1 overflow-y-auto bg-neutral-900/50 border-l border-neutral-800">
                {selectedJobId && !myJobs ? (
                    <JobDetailView id={selectedJobId} applied={myApplications}/>
                ) : selectedJobId && myJobs ? (
                    <EmployerJobDetailView id={selectedJobId}/>
                ) : (
                    <div className="flex items-center justify-center h-full text-neutral-500">
                        {myApplications ? 'Select a application to view job details' : 'Select a job to view details'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;