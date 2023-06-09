import {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {FaEyeSlash, FaEye} from 'react-icons/fa';

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = data => console.log(data);

    return (
        <div className="hero min-h-screen bg-base-200 py-32">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-center text-4xl font-semibold mt-3">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body py-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email", {required: "Email Address is required"})}
                            aria-invalid={errors.email ? "true" : "false"} type="email" placeholder="email" className="input input-bordered"
                        />
                        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", {required: true})} type={`${isOpen ? 'text' : 'password'}`} placeholder="password" className="input input-bordered" />
                        <span className="absolute bottom-12 right-2" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaEyeSlash /> : <FaEye />}</span>
                        {errors.password && <p className="text-red-600">{"Password is required"}</p>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Login" className="btn bg-slate-300" />
                    </div>
                    <p className="label-text-alt">New to account? <Link className=" link link-hover" to='/register'>Register</Link></p>
                </form>
                <p className="divider">or</p>
                <div className="text-center mb-6">
                    <button className="btn btn-circle btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
