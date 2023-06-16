import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import {BsTrash} from 'react-icons/bs'
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ListedClass = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleDeleteBtn = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-camp-school-server-coral-one.vercel.app/carts/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                        }
                    })
            }
        })
    }

    return (
        <>
            <Helmet title="SM Academy/dashboard/selected-class" />
            <SectionTitle heading='Selected-Class' />
            <div>
                <h2 className="text-5xl my-8 uppercase font-semibold">{cart.length} Listed Class and Total cost ${total}</h2>
            </div>
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
                            cart.map((item, index) => <tr key={item._id} >
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
                                    <button onClick={() => handleDeleteBtn(item._id)} className="btn btn-ghost"><BsTrash className="text-xl text-red-600" /></button>
                                    <Link to={`/dashboard/payment/${item._id}`}> <button className="btn btn-ghost text-[18px]">Pay</button></Link>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListedClass;