import {useContext} from "react";
import {AuthContext} from "../../components/Providers/AuthProviders";
import {Navigate, useLocation} from "react-router-dom";

const PrivetRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span>Loading....</span>
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace />
};

export default PrivetRoutes;