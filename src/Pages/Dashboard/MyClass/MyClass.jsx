import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import {Helmet} from "react-helmet";

const MyClass = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: users = []} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/menu/${user.email}`)
            return res.data;
        }
    })

    return (
        <>
            <Helmet title="SM Academy/dashboard/My-class" />
            <SectionTitle heading='My Posted Class' />
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course</th>
                                <th>Instructor</th>
                                <th>Course Fee</th>
                                <th>Enrolled</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => <tr key={item._id} >
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.classImg} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.className}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        Name: {item.instructor}
                                        <br />
                                        Email: <span className="badge badge-ghost badge-sm">Email:{item.instructorEmail}</span>
                                    </td>
                                    <td>${item.price}</td>
                                    <td>{item.students}</td>
                                    <th>

                                    </th>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyClass;