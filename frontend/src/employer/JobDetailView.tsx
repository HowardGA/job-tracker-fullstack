import { useState } from "react";
import { FaLocationDot, FaMapPin, FaBriefcase } from "react-icons/fa6";
import { useGetSingleJob } from "../queries/job.queries";
import { capitalizeFirsLetter, replaceUnderscoreWithSpace } from "../utils/Strings";
import { MdDateRange } from "react-icons/md";
import { formatDate } from "../utils/Strings";
import Badge from "../components/Badge";
import DetailList from "../components/DetailListJob";
import { useAuth } from "../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import CoverLetterModal from "../components/CoverLetterModal";

interface JobDetailViewProps {
    id: string;
    applied?: boolean;
}

const JobDetailView = ({ id, applied }: JobDetailViewProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: job, isLoading, isError } = useGetSingleJob(id);
    const {user} = useAuth();
    const navigate = useNavigate();

    if (isLoading) return <div className="p-10 animate-pulse text-neutral-500">Loading details...</div>;
    if (isError) return <div className="p-10 text-red-400">Error loading details.</div>;

    const details = job?.job;

    const handleApplication = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="w-full h-full bg-neutral-900/40 p-8 overflow-y-auto custom-scrollbar">
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

            <div className="space-y-8 text-neutral-300">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Job Description</h3>
                    <p className="leading-relaxed">{details?.description}</p>
                </div>

                <DetailList title="Key Responsibilities" items={details?.tasks.split('\n')} />
                <DetailList title="Requirements" items={details?.requirements.split('\n')} />
                <DetailList title="Desired Skills" items={details?.desirable.split('\n')} />
            </div>

            {user?.role !== "EMPLOYER" || applied && <div className="mt-10 pt-6 border-t border-neutral-800">
                <button 
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all"
                    onClick={handleApplication}
                >
                    Apply Now
                </button>
            </div>}

            {applied && <div className="mt-10 pt-6 border-t border-neutral-800">
                <button 
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
                    onClick={handleApplication}
                >
                    Withdraw Application
                </button>
            </div>}
            {isModalOpen && job?.job?.id && <CoverLetterModal jobId={job?.job?.id} onClose={closeModal} isOpen={isModalOpen}/>}
        </section>
    );
};

export default JobDetailView;