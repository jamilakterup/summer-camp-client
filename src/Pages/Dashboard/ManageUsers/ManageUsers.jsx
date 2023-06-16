import {useQuery} from "@tanstack/react-query";
import {Helmet} from "react-helmet";
import {toast} from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('http://localhost:5000/users')
            return res.data;
        }
    });


    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/role/${user._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({role: 'admin'})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    toast.success(`${user.name} is an admin now`)
                    refetch();
                }
            })
    }

    const handleMakeInstructor = user => {
        fetch(`http://localhost:5000/users/role/${user._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({role: 'instructor'})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    toast.success(`${user.name} is an instructor now`)
                    refetch();
                }
            })
    }

    return (
        <div>
            <Helmet title="SM Academy/dashboard/Manage-Users" />
            <SectionTitle heading='manage-users' />
            <h3 className="text-3xl font-semibold mb-8">Total users {users?.length}</h3>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role ? user.role : 'students'}</td>
                                <td className="text-center">
                                    <button onClick={() => handleMakeInstructor(user)} className="btn btn-ghost">Make Instructor</button>
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost">Make Admin</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageUsers;