import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import {Helmet} from "react-helmet";

const InstructorHome = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: users = []} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/menu/${user.email}`)
            return res.data;
        }
    })

    const {data: stats = {}} = useQuery({
        queryKey: ['instructor-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/instructor-stats')
            return res.data
        }
    })


    return (
        <div>
            <Helmet title="SM Academy/dashboard/Instructor-Home" />
            <SectionTitle heading='Welcome Home' />

            <div>
                <div>
                    <div className="stats shadow w-full">

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="stat-title">Total enrolled students</div>
                            <div className="stat-value">{stats.parchesClass}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            </div>
                            <div className="stat-title">Total Posted Class</div>
                            <div className="stat-value">{users.length}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorHome;