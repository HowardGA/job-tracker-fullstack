import { Link } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";
import { capitalizeFirsLetter } from "../utils/Strings";
import { useLogout } from "../queries/auth.queries";
import { toast } from "sonner";

const Navbar = () => {
    const {user, isAuthenticated, isLoading} = useAuth();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        toast.promise(logoutMutation.mutateAsync(), {
            loading: 'Logging out',
            success: 'Logged out successfully',
            error: (err) => err
        });
    } 

    return (
        <nav className="sticky top-0 z-50 w-full flex flex-row justify-between bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 px-6 py-3">
            <Link to ="/" className="flex items-center gap-2 tracking-tight">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-white group-hover:bg-sky400 transition-clors">
                    P
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                    Perfect<span className="text-sky-500"> Candidate</span>
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                <Link to="/jobs" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                    Find Jobs
                </Link>
                <Link to="/publish" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                    Post a Vacancy
                </Link>
            </div>

            <div className="flex item-center gap-4">
                {isLoading ? (
                    <div className="h-8 w-20 bg-neutral-800 animate-pulse rounded-full" />
                ) : isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <a className="text-sm font-semibold text-white leading-none" href="/profile">{user?.name}</a>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{capitalizeFirsLetter(user?.role ?? '')}</p>
                        </div>
                        <button 
                            type="button"
                            onClick={handleLogout} 
                            className="px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white border border-neutral-700 hover:border-red-400 hover:bg-red-500 rounded-xl transition-all">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login" 
                            className="px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white border border-neutral-700 hover:border-sky-00 hover:bg-sky-500 rounded-xl transition-all">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white border border-neutral-700 hover:border-sky-400 hover:bg-sky-500 rounded-xl transition-all">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;