import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";


const RootLayout = () => {
    return( 
        <>
            <main className="w-screen h-screen bg-neutral-900">
                <Navbar />
                <Outlet/>
            </main>
        </>
    )
};

export default RootLayout