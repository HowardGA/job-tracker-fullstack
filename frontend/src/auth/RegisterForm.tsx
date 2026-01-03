import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegisterFormInputs, registerSchema } from '../types/authTypes';
import { useRegister } from '../queries/auth.queries';
import { toast } from 'sonner';

const RegisterForm = () => {
    const { register, handleSubmit, formState: {errors}} = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema)
    });
    const registerMutation = useRegister();

    const onSubmit = (data: RegisterFormInputs) => {
        const {confirmPassword, ...apiPayload} = data;
        toast.promise(registerMutation.mutateAsync(apiPayload), {
            loading: 'Creating User...',
            success: 'User created successfully',
            error: (err) => err
        })
    
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full max-h-[75vh]'>
            <div className='flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar'>
                <div className='space-y-2'>
                    <label className="text-sm font-medium text-neutral-300 ml-1">First Name</label>
                    <input 
                        {...register('firstName')}
                        placeholder='Howard'
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500'
                    />
                    {errors.firstName && <p className='text-xs text-red-400 mt-1 ml-1'>{errors.firstName.message}</p>}
                </div>

                <div className='space-y-2'>
                    <label className="text-sm font-medium text-neutral-300 ml-1">Last Name</label>
                    <input 
                        {...register('lastName')}
                        placeholder='Garcia'
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500'
                    />
                    {errors.lastName && <p className='text-xs text-red-400 mt-1 ml-1'>{errors.lastName?.message}</p>}
                </div>

                <div className='space-y-2'>
                    <label className="text-sm font-medium text-neutral-300 ml-1">Email</label>
                    <input 
                        {...register('email')}
                        placeholder='example@example.com'
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500'
                    />
                    {errors.email && <p className='text-xs text-red-400 mt-1 ml-1'>{errors.email.message}</p>}
                </div>
                <div className='space-y-2'>
                    <label className="text-sm font-medium text-neutral-300 ml-1">Role</label>
                    <select
                        {...register('role')}
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500'
                    >
                        <option value='' disabled selected hidden>Select a Role</option>
                        <option value='CANDIDATE'>Candidate</option>
                        <option value='EMPLOYER'>Employer</option>
                    </select>
                    {errors.role && <p className='text-xs text-red-400 mt-1 ml-1'>{errors.role.message}</p>}
                </div>
                <div className='space-y-2'>
                    <label className="text-sm font-medium text-neutral-300 ml-1">Password</label>
                    <input 
                        {...register('password')}
                        placeholder='********'
                        type='password'
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500'
                    />
                    {errors.password && <p className='text-xs text-red-400 mt-1 ml-1'>{errors.password.message}</p>}
                </div>
                <div className='space-y-2'>
                    <label className="text-sm font-medium text-neutral-300 ml-1">Confirm Password</label>
                    <input 
                        {...register('confirmPassword')}
                        type='password'
                        placeholder='********'
                        className='w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-neutral-500 shadow-inner transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500'
                    />
                    {errors.confirmPassword && <p className='text-xs text-red-400 mt-1 ml-1'>{errors.confirmPassword.message}</p>}
                </div>
            </div>
            <div className='pt-6 bg-neutral-900 border-t border-neutral-800 mt-2'>
                <button 
                    type='submit'
                    className="w-full mt-4 rounded-xl px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20 transform active:scale-[0.98] transition-all duration-150"
                    >
                    Create Account
                </button>

                <p className="text-center text-sm text-neutral-500 mt-6">
                    Have an account? <a href="/login" className="text-sky-500 hover:underline font-medium">Login</a>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;