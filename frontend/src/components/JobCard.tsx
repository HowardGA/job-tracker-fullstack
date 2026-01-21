import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin, FaBriefcase } from "react-icons/fa";
import { capitalizeFirsLetter, numberOfDays, replaceUnderscoreWithSpace} from "../utils/Strings";
import type { ApplicationStatus } from "../types/applicationTypes";
import { getStatusStyles } from "../utils/ColorTags";


interface JobCardProps {
    id: string;
    title: string;
    company: string;
    location: string;
    workplace: string;
    worktype: string;
    isSelected: boolean;
    jobDate: string;
    status?: ApplicationStatus;
    numberOfApplications?: number;
    onSelected: (id: string) => void;
}

const JobCard = ({ id, title, company, location, workplace, worktype, isSelected, onSelected, jobDate, status, numberOfApplications } : JobCardProps) => {
    return (
        <article 
            onClick={() => onSelected(id)}
            className={`
                p-5 cursor-pointer border-2 transition-all duration-200 rounded-2xl flex flex-col gap-2
                ${isSelected 
                    ? 'border-sky-500 bg-sky-500/5 shadow-lg shadow-sky-500/10' 
                    : 'border-neutral-800 bg-neutral-800/20 hover:border-neutral-700 hover:bg-neutral-800/40'}
            `}
        >
            <div className="flex justify-between items-start">
                <h3 className={`font-bold text-lg ${isSelected ? 'text-sky-400' : 'text-white'}`}>
                    {title}
                </h3>
                <div className="flex gap-x-2">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold bg-neutral-800 px-2 py-1 rounded">
                    {numberOfApplications ? `Applications: ${numberOfApplications}` : `${status ? 'Applied ' : ''}${numberOfDays(jobDate)}`}
                </span>
                {status && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusStyles(status)}`}>
                            {status}
                        </span>
                    )}
                </div>
            </div>

            <p className="text-neutral-300 font-medium">{company}</p>

            <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-md">
                    <span><FaLocationDot color="#0ea5e9"/></span> {location}
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400 bg-neutral-800/50 px-2 py-1 rounded-md">
                    <span><FaMapPin color="#0ea5e9"/></span> {workplace}
                </div>
                <div className="flex items-center gap-1 text-xs text-sky-400 bg-sky-400/10 px-2 py-1 rounded-md">
                    <span><FaBriefcase color="#0ea5e9"/></span> {capitalizeFirsLetter(replaceUnderscoreWithSpace(worktype))}
                </div>
            </div>
        </article>
    );
};

export default JobCard;