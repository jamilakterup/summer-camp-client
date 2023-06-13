import {Helmet} from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {useForm} from 'react-hook-form';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {Button} from "@mui/material";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const {register, handleSubmit, reset} = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.classImg[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const {instructor, instructorEmail, className, totalSeat, price, description} = data;
                    const newItem = {instructor, instructorEmail, className, price: parseFloat(price), totalSeat: parseFloat(totalSeat), description, classImg: imgURL}

                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })

    };


    return (
        <div>
            <Helmet title="SM Academy/Add-a-class" />
            <SectionTitle subHeading="What's new" heading="Add A Class" ></SectionTitle>


            <div className="flex flex-col-reverse md:flex-row container mx-auto mb-20">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-6 my-6">
                        <input className="input input-bordered w-full" {...register("instructor")} defaultValue={user?.displayName} readOnly />
                        <input className="input input-bordered w-full"  {...register("instructorEmail", {required: true})} defaultValue={user?.email} readOnly />
                    </div>

                    <div className="flex gap-6 my-6">
                        <input className="input input-bordered w-full" placeholder="class name" {...register("className")} />
                        <input type="file" className="input input-bordered w-full pt-2"{...register("classImg", {required: true})} />
                    </div>
                    <div className="flex gap-6 my-6">
                        <input type="number" className="input input-bordered w-full" placeholder="total seat" {...register("totalSeat")} />
                        <input type="number" className="input input-bordered w-full"  {...register("price", {required: true})} placeholder="seat range" />
                    </div>

                    <textarea cols="30" rows="5" className="textarea input-bordered w-full mb-4" placeholder="Description" {...register("description")}></textarea>
                    <br />
                    <Button type="submit" className="w-full" style={{backgroundColor: '#f0f0f0', color: '#000'}} variant="contained">Add Class</Button>
                </form>
            </div>
        </div>
    );
};

export default AddClass;