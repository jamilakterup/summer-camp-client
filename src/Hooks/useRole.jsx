import {useQuery} from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: role, isLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data;
        }
    })
    return [role, isLoading]
};

export default useRole;