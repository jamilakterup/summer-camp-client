import {Outlet} from "react-router-dom";
import NavBar from "../Pages/Shareed/NavBar/NavBar";
import Footer from "../Pages/Shareed/Footer/Footer";

const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;