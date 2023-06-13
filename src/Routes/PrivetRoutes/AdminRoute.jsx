
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <span>Loading....</span>
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to='/' state={{from: location}} replace />
};

export default AdminRoute;