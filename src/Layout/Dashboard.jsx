import {NavLink, Outlet, ScrollRestoration} from "react-router-dom";
import Footer from "../Pages/Shareed/Footer/Footer";
import NavBar from "../Pages/Shareed/NavBar/NavBar";
import Container from "../components/Container";
import {MdFavorite, MdManageAccounts} from 'react-icons/md';
import {SiGoogleclassroom} from 'react-icons/si';
import {BsFillJournalBookmarkFill} from 'react-icons/bs';
import {BiSelectMultiple} from 'react-icons/bi';
import {VscFeedback} from 'react-icons/vsc';
import {FaWallet, FaHome, FaUsers} from 'react-icons/fa';
import {Helmet} from "react-helmet";
import useCart from "../Hooks/useCart";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
    const {user} = useAuth();
    console.log(user);
    const [cart] = useCart();
    // TODO: load data from the server to have dynamic isAdmin based on data
    // const role = 'admin';
    const [role] = useRole();
    let dashboardContent;
    if (role === 'admin') {
        dashboardContent = <>
            <li className="text-xl"><NavLink to='/dashboard/admin'><FaHome />Admin Home</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/manageClasses'><SiGoogleclassroom />Manage Classes</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/manageUsers'><MdManageAccounts />Manage Users</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/allUsers'><FaUsers />All Users</NavLink></li>
        </>
    } else if (role === 'instructor') {
        dashboardContent = <>
            <li className="text-xl"><NavLink to='/dashboard/instructor'><FaHome />Instructor Home</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/AddClass'><BsFillJournalBookmarkFill />Add a Class</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/myClass'><SiGoogleclassroom />My Classes</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/enrolledStudents'><FaUsers />Total Enrolled Students</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/feedback'><VscFeedback />Feedback</NavLink></li>
        </>
    }
    else {
        dashboardContent = <>
            <li className="text-xl"><NavLink to='/dashboard/student'><FaHome />User Home</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/listedClass'><MdFavorite />My Selected Classes {cart.length}</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/enrolledClass'><BiSelectMultiple />My Enrolled Classes</NavLink></li>
            <li className="text-xl"><NavLink to='/dashboard/paymentHistory'><FaWallet />Payment History</NavLink></li>
        </>
    }

    return (
        <>
            <Helmet title="SM Academy/Dashboard" />
            <NavBar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-12">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">Open Menu</label>
                    <Container>
                        <Outlet />
                    </Container>
                </div>
                <div className="drawer-side mt-[69px]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {user?.photoURL && <img className="w-32 h-32 rounded-full mx-auto" src={user?.photoURL} alt="" />}
                        {user?.displayName && <p className="text-2xl mx-auto mb-6">{user.displayName}</p>}
                        <div className="border mb-5"></div>
                        {dashboardContent}
                    </ul>

                </div>
            </div>
            <Footer />
            <ScrollRestoration />
            <ScrollRestoration />
        </>
    );
};

export default Dashboard;