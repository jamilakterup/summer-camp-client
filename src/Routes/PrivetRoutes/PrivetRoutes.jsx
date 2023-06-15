import {useContext} from "react";
import {AuthContext} from "../../components/Providers/AuthProviders";
import {Navigate, useLocation} from "react-router-dom";

const PrivetRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>

    }

    if (user?.email) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace />
};

export default PrivetRoutes;