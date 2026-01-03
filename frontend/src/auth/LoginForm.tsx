import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from "../queries/auth.queries";
import { loginSchema, type LoginFormInputs } from "../types/authTypes";
import { toast } from "sonner";


const LoginForm = () => {
    const loginMutation = useLogin();

    const { register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormInputs) => {
        toast.promise(loginMutation.mutateAsync(data), {
            loading: 'Loggin in...',
            success: 'Logged in!',
            error: (err) => err
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                <input 
                    {...register('email')} 
                    placeholder="name@company.com"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Password</label>
                <input 
                    type="password"
                    {...register('password')} 
                    placeholder="••••••••"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                />
                {errors.password && <p className="text-xs text-red-400 mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button 
                type="submit" 
                className="w-full mt-4 rounded-xl px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20 transform active:scale-[0.98] transition-all duration-150"
            >
                Sign In
            </button>

            <p className="text-center text-sm text-neutral-500 mt-6">
                Don't have an account? <a href="/register" className="text-sky-500 hover:underline font-medium">Create one</a>
            </p>
        </form>
    );
};

export default LoginForm;