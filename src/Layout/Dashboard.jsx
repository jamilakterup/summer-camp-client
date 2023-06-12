import {NavLink, Outlet, ScrollRestoration} from "react-router-dom";
import Footer from "../Pages/Shareed/Footer/Footer";
import NavBar from "../Pages/Shareed/NavBar/NavBar";
import Container from "../components/Container";
import {MdFavorite, MdManageAccounts} from 'react-icons/md';
import {SiGoogleclassroom} from 'react-icons/si';
import {BsFillJournalBookmarkFill} from 'react-icons/bs';
import {BiSelectMultiple} from 'react-icons/bi';
import {FaWallet, FaHome, FaUsers} from 'react-icons/fa';
import {Helmet} from "react-helmet";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
    // TODO: load data from the server to have dynamic isAdmin based on data
    const role = 'admin';
    let dashboardContent;

    if (role === 'admin') {
        dashboardContent = <>
            <li className="text-xl"><NavLink to='/dashboard/userHome'><FaHome />Admin Home</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/reservedClass'><SiGoogleclassroom />Manage Classes</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/paymentHistory'><MdManageAccounts />Manage Users</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/allUsers'><FaUsers />All Users</NavLink></li>
        </>
    } else if (role === 'instructor') {
        dashboardContent = <>
            <li className="text-xl"><NavLink to='/dashboard/userHome'><FaHome />Instructor Home</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/listedClass'><BsFillJournalBookmarkFill />Add a Class</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/reservedClass'><BiSelectMultiple />My Classes</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/paymentHistory'><FaWallet />Total Enrolled Students</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/paymentHistory'><FaWallet />Feedback</NavLink></li>
        </>
    }
    else {
        dashboardContent = <>
            <li className="text-xl"><NavLink to='/dashboard/userHome'><FaHome />User Home</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/listedClass'><MdFavorite />My Selected Classes {cart.length}</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/reservedClass'><BiSelectMultiple />My Enrolled Classes</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/paymentHistory'><FaWallet />Payment History</NavLink></li>
        </>
    }

    return (
        <>
            <Helmet title="SM Academy/Dashboard" />
            <NavBar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-20">
                    {/* Page content here */}

                    <Container>
                        <Outlet />
                    </Container>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side mt-[69px]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {dashboardContent}
                    </ul>

                </div>
            </div>
            <Footer />
            <ScrollRestoration />
        </>
    );
};

export default Dashboard;