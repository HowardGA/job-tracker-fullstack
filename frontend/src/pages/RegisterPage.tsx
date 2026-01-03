import RegisterForm from "../auth/RegisterForm" 

const RegisterPage = () => {
    return (
        <div className="w-screen h-screen bg-neutral-900 flex flex-row overflow-hidden font-sans">
            <section className='w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 lg:px-32 relative z-10 bg-neutral-900'>
                <div className="max-w-md w-full mx-auto">
                    <header className="mb-10">
                        <h1 className='text-4xl text-white font-extrabold tracking-tight'>
                            Perfect <span className="text-sky-500">Candidate</span>
                        </h1>
                        <p className="text-neutral-400 mt-2">Hi! Create an Account.</p>
                    </header>
                    <RegisterForm />
                </div>
            </section>
           <section className='hidden lg:block lg:w-1/2 h-full relative'>
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/60 to-transparent z-10" />
                <img 
                    src='https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg' 
                    alt='Professional Workspace' 
                    className='h-full w-full object-cover grayscale-[20%] brightness-90'
                />
            </section>
        </div>
    );
};

export default RegisterPage;