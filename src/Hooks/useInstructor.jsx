import {useQuery} from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: role, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            console.log(res.data);
            return res.data.instructor;
        }
    })
    return [role, isInstructorLoading]
};

export default useInstructor;