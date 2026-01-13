import { FaUpload } from "react-icons/fa6";
import CVUploadForm from "../candidate/CVUploadForm";
import { useGetCV } from "../queries/cv.queries";
import { useGetUserData } from "../queries/user.queries";

const ProfileInfo = () => {
    const {data: userData, isLoading, error} = useGetUserData();
    const hasCV = !!userData?.user?.cvUrl;
    const { data: cvData, isLoading: cvLoading } = useGetCV({
        enabled: hasCV 
    });

   if (isLoading) return <p className="animate-pulse">Loading Profile...</p>;

    if (error) {
        return <p className="text-sm text-red-500">{error.message}</p>
    }

return (
    <section className="p-6 h-screen flex flex-col overflow-hidden bg-neutral-950">
        {/* Header - Fixed Height */}
    
        <div className="flex-1 flex flex-col min-h-0">
            <h2 className="text-white font-bold text-xl mb-4 shrink-0">Manage Your CV</h2>
            
            {hasCV ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0">
                    
                    <div className="lg:col-span-8 flex flex-col h-full min-h-0 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
                        {cvLoading ? (
                            <div className="flex-1 animate-pulse flex items-center justify-center text-neutral-500">
                                <p>Generating secure link...</p>
                            </div>
                        ) : (
                            <>
                                <iframe
                                    src={cvData?.url}
                                    title="CV Viewer"
                                    className="w-full flex-1 border-none"
                                />
                                <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex justify-between items-center">
                                    <span className="text-xs text-neutral-500 italic">Private PDF Viewer</span>
                                    <a 
                                        href={cvData?.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-sky-500 hover:text-sky-400 font-medium text-xs bg-sky-500/10 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        Open Fullscreen
                                    </a>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                            <h4 className="text-white font-semibold mb-2">Update Documents</h4>
                            <p className="text-sm text-neutral-500 mb-6">
                                Upload a new PDF to replace your current CV. This will permanently delete the old file.
                            </p>
                            <CVUploadForm isEditMode={true} />
                        </div>

                        <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                            <h4 className="text-white font-semibold mb-2">Job Matches</h4>
                            <p className="text-sm text-neutral-500">
                                Your CV is currently being parsed to improve job recommendations.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-md w-full bg-neutral-900 border-2 border-dashed border-neutral-800 p-12 rounded-3xl text-center">
                        <div className="bg-sky-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaUpload className="text-sky-500 text-2xl" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-2">No CV found</h3>
                        <p className="text-neutral-500 mb-8">Upload your CV to start applying for vacancies.</p>
                        <CVUploadForm isEditMode={false} />
                    </div>
                </div>
            )}
        </div>
    </section>
);
};

export default ProfileInfo;