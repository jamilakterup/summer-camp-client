import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../components/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllInstructors from "../Pages/AllInstructors/AllInstructors";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";
import ListedClass from "../Pages/Dashboard/ListedClass/ListedClass";
import PrivetRoutes from "./PrivetRoutes/PrivetRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'instructors',
                element: <AllInstructors />
            },
            {
                path: 'allClass',
                element: <AllClasses />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoutes><Dashboard /></PrivetRoutes>,
        children: [
            {
                path: 'listedClass',
                element: <ListedClass />
            }
        ]
    }
]);

export default router;