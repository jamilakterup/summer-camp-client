import {Outlet} from "react-router-dom";
import NavBar from "../Pages/Shareed/NavBar/NavBar";
import Footer from "../Pages/Shareed/Footer/Footer";

const Main = () => {
    return (
        <div>
            <NavBar />
            <div className="min-h-[calc(100vh-294px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;