import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../components/Providers/AuthProviders";
import {FaEyeSlash, FaEye, FaGoogle} from 'react-icons/fa';
import {Button} from "@mui/material";
import {toast} from "react-hot-toast";
import {Helmet} from "react-helmet";


const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Register = () => {

    const {signUpUser, updateUser, signUpWithGoogle, setLoading} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmit = data => {

        const formData = new FormData();
        formData.append('image', data.photo[0])


        if (data.password === data.confirm) {
            fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgResponse => {
                    console.log(imgResponse);
                    const imgURL = imgResponse.data.display_url;

                    signUpUser(data.email, data.password)
                        .then(result => {
                            const newUser = result.user;
                            console.log(newUser);
                            updateUser(data.name, imgURL)
                                .then(() => {
                                    const savedUser = {name: data.name, email: data.email}
                                    fetch('http://localhost:5000/users', {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify(savedUser)
                                    })
                                        .then(res => res.json())
                                        .then(() => {
                                            toast.success('Register Successful!')
                                            navigate(from, {replace: true});
                                        })
                                    reset();
                                })
                                .catch(err => {
                                    setLoading(false)
                                    console.log(err)
                                    toast.error(err.message);
                                });
                        })
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                            toast.error(err.message);
                        })
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                    toast.error(err.message);
                })

            return;

        } else {
            toast.error('Please enter right password')
        }
    };



    const handleGoogleLogin = () => {
        signUpWithGoogle()
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                const savedUser = {name: loggedUser.displayName, email: loggedUser.email}
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        toast.success('Register Successful!')
                        navigate(from, {replace: true});
                    })
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="hero min-h-screen bg-base-200 py-32">
            <Helmet title="SM Academy/Register" />
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-center text-4xl font-semibold mt-3">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body py-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            {...register("name", {required: true})}
                            aria-invalid={errors.name ? "true" : "false"} type="text" placeholder="name" className="input input-bordered"
                        />
                        {errors.name && <p className="text-red-600">{"Please enter your name"}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", {required: true})}
                            type="email" placeholder="email" className="input input-bordered"
                        />
                        {errors.email && <p className="text-red-600">{"Email is required"}</p>}
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", {required: true, minLength: 6})} type={`${isOpen ? 'text' : 'password'}`} placeholder="password" className="input input-bordered" />
                        <span className="absolute top-[52px] right-2" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaEye /> : <FaEyeSlash />}</span>
                        {errors.password?.type === 'required' && <p className="text-red-600">{"Password is required"}</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">{"Password Must be 6 characters or more"}</p>}
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input {...register("confirm", {required: true})} type={`${confirm ? 'text' : 'password'}`} placeholder="Confirm password" className="input input-bordered" />
                        <span className="absolute top-[52px] right-2" onClick={() => setConfirm(!confirm)}>{confirm ? <FaEye /> : <FaEyeSlash />}</span>
                        {errors.password?.type === 'required' && <p className="text-red-600">{"Password is required"}</p>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            {...register("photo", {required: true})}
                            aria-invalid={errors.photo ? "true" : "false"} type="file" className="input input-bordered pt-2"
                        />
                        {errors.photo && <p className="text-red-600">{errors.photo?.message}</p>}
                    </div>
                    <div className="form-control mt-6">
                        <Button type="submit" style={{backgroundColor: '#f0f0f0', color: '#000'}} variant="contained">Register</Button>
                    </div>
                    <p className="label-text-alt">Already have an account? <Link className=" link link-hover" to='/login'>Login</Link></p>
                </form>
                <p className="divider">or</p>
                <div className="text-center mb-6">
                    <Button onClick={handleGoogleLogin} style={{backgroundColor: '#f0f0f0', color: '#000', height: '60px', width: '20px', borderRadius: '50%'}} variant="contained"><FaGoogle className="text-xl" /></Button>
                </div>
            </div>
        </div>
    );
};

export default Register;