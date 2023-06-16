import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {Helmet} from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

// https://summer-camp-school-server-coral-one.vercel.app/payments/moon@gmail.com
const EnrolledClass = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data: cart = []} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })

    return (
        <>
            <Helmet title="SM Academy/dashboard/enrolled-class" />
            <SectionTitle heading='Enrolled-Class' />
            <div>
                <h2 className="text-5xl my-8 uppercase font-semibold">{cart.length} Enrolled Class</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course</th>
                            <th>Transaction Id</th>
                            <th>Course Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id} >
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
                                <td>{item.transactionId}</td>
                                <td>${item.price}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EnrolledClass;