import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {Helmet} from "react-helmet";

const EnrolledStudents = () => {
    const [axiosSecure] = useAxiosSecure();

    const {data: stats = []} = useQuery({
        queryKey: ['instructor-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/instructor-stats')
            return res.data
        }
    })

    return (
        <>
            <Helmet title="SM Academy/dashboard/Enrolled-students" />
            <SectionTitle heading='Enrolled Students' />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course</th>
                            <th>Students Email</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stats?.payments?.map((item, index) => <tr key={item._id} >
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{item.className}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.transactionId}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EnrolledStudents;