import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";


const RootLayout = () => {
    return( 
        <div className="flex flex-col min-h-screen w-full bg-neutral-900 overflow-x-hidden custom-scrollbar">
            <Navbar />
            <main className="flex-1 w-full flex flex-col">
                <Outlet />
            </main>
        </div>
    )
};

export default RootLayout