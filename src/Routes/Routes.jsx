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
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import InstructorRoute from "./PrivetRoutes/InstructorRoute";
import AdminRoute from "./PrivetRoutes/AdminRoute";
import MyClass from "../Pages/Dashboard/MyClass/MyClass";
import Payment from "../Pages/Dashboard/Payment/Payment";

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
                // for users
                path: 'listedClass',
                element: <ListedClass />
            },
            {
                path: 'payment/:id',
                element: <Payment />,
                loader: ({params}) => fetch(`http://localhost:5000/carts/${params.id}`)
            },
            // for instructors
            {
                path: 'AddClass',
                element: <InstructorRoute><AddClass /></InstructorRoute>
            },
            {
                path: 'myClass',
                element: <InstructorRoute><MyClass /></InstructorRoute>
            },
            // for admin
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            }
        ]
    }
]);

export default router;