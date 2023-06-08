import {useState} from "react";
import './NavBar.css';
import {Link} from "react-router-dom";
import logo from '../../../assets/logo.png';
import Container from "../../../components/Container";
import {FaBars} from 'react-icons/fa';



const NavBar = () => {
    const [activeLink, setActiveLink] = useState('');

    const navItems = <>
        <li className={activeLink === 'home' ? 'active' : ''}>
            <Link to='/' onClick={() => setActiveLink('home')} className="font-semibold">Home</Link>
        </li>
        <li className={activeLink === 'Instructors' ? 'active' : ''}>
            <Link to='/' onClick={() => setActiveLink('Instructors')} className="font-semibold">Instructors</Link>
        </li>
        <li className={activeLink === 'Classes' ? 'active' : ''}>
            <Link to='/' onClick={() => setActiveLink('Classes')} className="font-semibold">Classes</Link>
        </li>
        <li className={activeLink === 'Dashboard' ? 'active' : ''}>
            <Link to='/' onClick={() => setActiveLink('Dashboard')} className="font-semibold">Dashboard </Link>
        </li>
    </>

    return (
        <div className="fixed top-0 w-full bg-white z-10 shadow-sm border-b-[1px]">
            <Container >
                <nav className="navbar px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {navItems}
                            </ul>
                        </div>
                        <Link to='/' onClick={() => setActiveLink('home')}><img className="w-32" title="Summer Music Academy" src={logo} alt="logo" /></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn rounded-full"><FaBars />
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-9">
                                        <span className="text-xs">AA</span>
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link>Login</Link></li>
                                <li><Link>Register</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            </Container>
        </div>
    );
};

export default NavBar;