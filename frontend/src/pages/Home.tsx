import Hero from "../components/Hero";

const Home = () => {
    return (
        <div className="w-full h-full">
            <Hero 
                img="https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg"
                alt="Vancancy Finder"
                title="Find Your Dream Job"
                phrase="Find the vacancy that is just right for you."
                cta={{
                    text:"Browse Jobs",
                    link:"/jobs"  
                }}
                centered
            />
        </div>
    );
};

export default Home;