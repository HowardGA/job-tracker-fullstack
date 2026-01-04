import { Link } from "react-router-dom";

interface HeroProps {
    img: string;
    alt: string;
    title: string;
    phrase: string;
    cta?: {
        text: string;
        link: string;
    };
    centered?: boolean;
}

const Hero = ({img, alt, title, phrase, cta, centered = false} : HeroProps) => {
    return (
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center overflow-hidden bg-neutral-900">
            <div className="absolute inset-0 z-0">
                <img 
                    src={img} 
                    alt={alt}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to transparent"/>
            </div>
            <div className={`relative z-10 container mx-auto px-6 ${centered ? 'text-center' : 'text-left'}`}>
                <h1 className="text-5-xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-neutral-300 font-medium">
                    {phrase}
                </p>

                {cta && (
                    <div className="pt-4">
                        <Link 
                            to={cta.link}
                            className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/20 transition-all transform active:scale-95"
                        >
                            {cta.text}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;