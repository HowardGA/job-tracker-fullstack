import Badge from "./Badge";
import { FaLocationDot, FaMapPin, FaBriefcase, FaTriangleExclamation } from "react-icons/fa6";
import { capitalizeFirsLetter, replaceUnderscoreWithSpace } from "../utils/Strings";
import { MdDateRange } from "react-icons/md";
import { formatDate } from "../utils/Strings";
import DetailList from "./DetailListJob";
import type { Job } from "../types/jobTypes";
import { useDeleteJob, useToggleJobVisibility } from "../queries/job.queries";
import { toast } from "sonner";

const JobInfoContent = ({ details, showControls = false }: { details: Job, showControls: boolean }) => {
    const deleteJobMutation = useDeleteJob();
    const toggleJobVisibility = useToggleJobVisibility();
    
    const handleDelete = () => {
        toast("Are you sure you want to delete this vacancy?", {
            description: "This action cannot be undone and all application data will be lost.",
            action: {
                label: "Delete",
                onClick: () => executeDelete(),
            },
            cancel: {
                label: "Cancel",
                onClick: () => console.log("Cancelled"),
            },
            actionButtonStyle: { backgroundColor: '#ef4444', color: 'white' }
        });
    };

    const executeDelete = () => {
        toast.promise(deleteJobMutation.mutateAsync(details.id), {
            loading: 'Deleting Vacancy...',
            success: 'Vacancy Deleted Successfully!',
            error: (error) => error
        });
    };

    const handleCloseJob = () => {
        toast.promise(toggleJobVisibility.mutateAsync(details.id), {
            loading: details.isVisible ? 'Closing Vacancy...' : 'Re-opening Vacancy...',
            success: details.isVisible ? 'Vacancy Closed!' : 'Vacancy Re-opened',
            error: (error) => error
        })
    };

    return(
        <>
            <div className="border-b border-neutral-800 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">{details?.title}</h1>
                <p className="text-xl text-sky-400 font-medium">{details?.company}</p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Badge icon={<MdDateRange />} text={formatDate(details?.createdAt)} />
                    <Badge icon={<FaLocationDot />} text={details?.location} />
                    <Badge icon={<FaMapPin />} text={capitalizeFirsLetter(details?.workplace || '')} />
                    <Badge icon={<FaBriefcase />} text={capitalizeFirsLetter(replaceUnderscoreWithSpace(details?.type || ''))} isHighlight />
                </div>
            </div>

            {!details.isVisible && (
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-500 p-3 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                    <FaTriangleExclamation /> This vacancy is currently closed to new applicants.
                </div>
            )}
            
            <div className="space-y-8 text-neutral-300">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Job Description</h3>
                    <p className="leading-relaxed">{details?.description}</p>
                </div>
                <DetailList title="Key Responsibilities" items={details?.tasks.split('\n')} />
                <DetailList title="Requirements" items={details?.requirements.split('\n')} />
                {showControls && (
                    <div className="flex flex-row gap-4 pt-6 border-t border-neutral-800 mt-8">
                        <button
                            onClick={handleDelete}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all"
                        >
                            Delete Vacancy
                        </button>

                        <button
                            onClick={handleCloseJob}
                            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 font-bold text-white rounded-xl transition-all"
                        >
                            {details.isVisible ? 'Close Vacancy' : 'Re-Open Vacancy'}
                        </button>
                    </div>
                )}
            </div>
        </>
    )
};

export default JobInfoContent;