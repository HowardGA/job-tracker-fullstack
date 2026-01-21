import { FaFilePdf, FaPencil } from "react-icons/fa6";
import type { ApplicationForEmployer, ApplicationStatus } from "../types/applicationTypes";
import { getStatusStyles } from "../utils/ColorTags";
import { applicationStatusArray } from "../types/applicationTypes";
import { capitalizeFirsLetter, replaceUnderscoreWithSpace } from "../utils/Strings";
import { useChangeApplicationStatus } from "../queries/application.queries";
import { toast } from "sonner";

const ApplicantRow = ({ application }: { application: ApplicationForEmployer }) => {
    const changeStatusMutation = useChangeApplicationStatus();

    const onStatusChange = (newStatus: ApplicationStatus, isAuto: boolean = false) => {
        if (application.status !== 'APPLIED' && newStatus === 'UNDER_REVIEW') return;

        if (application.status === newStatus) return;

        if (isAuto) {
            changeStatusMutation.mutate({ 
                status: newStatus, 
                applicationId: application.id 
            });
        } else {
            toast.promise(
                changeStatusMutation.mutateAsync({ 
                    status: newStatus, 
                    applicationId: application.id 
                }), 
                {
                    loading: 'Changing status...',
                    success: 'Status Changed successfully!',
                    error: (err) => err?.response?.data?.message || 'Failed to change status'
                }
            );
        }
    };
    return (
        <div className="flex items-center justify-between p-4 bg-neutral-800/30 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
                    {application.candidate.firstName[0]}{application.candidate.lastName[0]}
                </div>
                <div>
                    <h4 className="text-white font-medium">
                        {application.candidate.firstName} {application.candidate.lastName}
                    </h4>
                    <p className="text-xs text-neutral-500">{application.candidate.email}</p>
                </div>
            </div>

             <span className={`text-xs font-bold px-3 py-1.5 rounded border ${getStatusStyles(application.status)}`}>
                {application.status}
            </span>

            <div className="flex items-center gap-3">
                <a 
                    href={application.candidate.cvUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => onStatusChange('UNDER_REVIEW', true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white text-xs rounded-lg transition-colors"
                >
                    <FaFilePdf /> View CV
                </a>

                {application.coverLetterUrl && (
                    <a 
                        href={application.coverLetterUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs rounded-lg transition-colors"
                    >
                        Cover Letter
                    </a>
                )}
            </div>
            <select
                value={application.status}
                onChange={(e) => {onStatusChange(e.target.value as ApplicationStatus)}}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white text-xs rounded-lg transition-colors"
            >
                <option selected disabled><FaPencil />Change Status</option>
                {applicationStatusArray.map((status, idx) => (
                    <option 
                        value={status} 
                        key={idx} 
                        disabled={status === 'APPLIED' || status === 'UNDER_REVIEW' || status === application.status}
                    >
                        {capitalizeFirsLetter((replaceUnderscoreWithSpace(status)))}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ApplicantRow;