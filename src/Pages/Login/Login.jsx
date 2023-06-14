import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaEyeSlash, FaEye, FaGoogle} from 'react-icons/fa';
import {AuthContext} from "../../components/Providers/AuthProviders";
import {Button} from "@mui/material";
import {toast} from "react-hot-toast";
import {Helmet} from "react-helmet";

const Login = () => {
    const {signInUser, signUpWithGoogle} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        setError('')
        signInUser(data.email, data.password)
            .then(result => {
                const loggedUsr = result.user;
                console.log(loggedUsr);
                toast.success('Login Successful!')
                navigate(from, {replace: true})
            })
            .catch(err => {
                console.log(err);
                setError(err.message)
            })
    };

    const handleGoogleLogin = () => {
        setError('')
        signUpWithGoogle()
            .then(result => {
                const loggedUser = result.user
                const savedUser = {name: loggedUser.displayName, email: loggedUser.email}
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        toast.success('Login Successful!')
                        navigate(from, {replace: true});
                    })
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="hero min-h-screen bg-base-200 py-32">
            <Helmet title="SM Academy/Login" />
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
                        <span className="absolute top-[52px] right-2" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaEye /> : <FaEyeSlash />}</span>
                        {errors.password && <p className="text-red-600">{"Password is required"}</p>}
                        <p className="text-red-600">{error}</p>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        {/* <input type="submit" value="Login" className="btn bg-slate-300" /> */}
                        <Button type="submit" style={{backgroundColor: '#f0f0f0', color: '#000'}} variant="contained">Login</Button>
                    </div>
                    <p className="label-text-alt">New to account? <Link className=" link link-hover" to='/register'>Register</Link></p>
                </form>
                <p className="divider">or</p>
                <div className="text-center mb-6">
                    <Button onClick={handleGoogleLogin} style={{backgroundColor: '#f0f0f0', color: '#000', height: '60px', width: '20px', borderRadius: '50%'}} variant="contained"><FaGoogle className="text-xl" /></Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
