import { Link } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import JobForm from "../employer/JobForm";

const CreateVacancy = () => {
    const {isAuthenticated, isLoading} = useAuth();

    if (isLoading) return <div className="p-10 text-white">Loading...</div>;

    return (
        <div className="w-full h-full p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-8 text-center sm:text-left">
                    Create a new Vacancy
                </h1>
                
                {isAuthenticated ? (
                    <JobForm />
                ) : (
                    <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-10 text-center">
                        <h3 className="text-lg text-white mb-6">
                            Please Login to Post a Vacancy
                        </h3>
                        <Link 
                            to='/login' 
                            className="inline-block px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateVacancy;