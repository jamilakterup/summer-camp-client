
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>

    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to='/' state={{from: location}} replace />
};

export default AdminRoute;