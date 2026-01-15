import  {useForm} from "react-hook-form";
import { FaFilePdf, FaUpload, FaXmark } from "react-icons/fa6";
import { ApplicationScheema, type ApplicationFormInput } from "../types/applicationTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitApplication } from "../queries/application.queries";
import { toast } from "sonner";

interface CoverLetterModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string;
}

const CoverLetterModal = ({ isOpen, onClose, jobId} : CoverLetterModalProps) => {
    const mutation = useSubmitApplication(jobId);
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: zodResolver(ApplicationScheema)
    });

    if (!isOpen) return null;

    const selectedFile = watch("coverLetter");
    const fileName = selectedFile?.[0]?.name;

    const onSubmit = (data: ApplicationFormInput) => {
        const file = data.coverLetter?.[0];
        toast.promise(mutation.mutateAsync(file), {
            loading: "Submitting application...",
            success: "Application submitted successfully!",
            error: (error) => error
        });
        reset();
        onClose();
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
        />

        <div className="relative bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
            <h3 className="text-xl font-bold text-white">Add a Cover Letter?</h3>
            <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                <FaXmark size={20} />
            </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <p className="text-neutral-400 text-sm">
                Adding a cover letter increases your chances of getting noticed by 40%.
            </p>
            
            <div className="group relative">
                    <label className={`
                      flex flex-col items-center justify-center w-full h-32 
                      border-2 border-dashed rounded-2xl cursor-pointer transition-all
                      ${errors.coverLetter ? "border-red-500 bg-red-500/5" : "border-neutral-700 bg-neutral-800/20 hover:border-sky-500 hover:bg-sky-500/5"}
                    `}>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf"
                        {...register("coverLetter")} 
                      />
                      
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {fileName ? (
                          <>
                            <FaFilePdf className="w-8 h-8 text-sky-500 mb-2" />
                            <p className="text-sm text-neutral-300 font-medium truncate max-w-[200px]">
                              {fileName}
                            </p>
                          </>
                        ) : (
                          <>
                            <FaUpload className="w-8 h-8 text-neutral-500 group-hover:text-sky-500 mb-2" />
                            <p className="text-sm text-neutral-400">
                              <span className="font-semibold text-sky-500">Click to upload</span> or drag
                            </p>
                            <p className="text-xs text-neutral-500">PDF only (max. 5MB)</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {errors.coverLetter && <p className="text-red-500 text-sm">{typeof errors.coverLetter.message === 'string' ? errors.coverLetter.message : 'Invalid file'}</p>}

            <div className="flex gap-3 pt-4">
                <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl font-semibold text-neutral-400 hover:bg-neutral-800 transition-colors"
                >
                Skip Cover Letter
                </button>
                <button
                type="submit"
                className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20"
                >
                Submit Application
                </button>
            </div>
            </form>
        </div>
        </div>
  );
};

export default CoverLetterModal;