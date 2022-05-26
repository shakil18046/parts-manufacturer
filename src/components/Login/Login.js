
import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../Hooks/useToken';
import Loading from '../Shared/Loading';

const Login = () => {
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user || gUser)
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };
    let signInErrorMessage;
    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInErrorMessage = <p className="text-red-500"><small>{error?.message || gError?.message}</small></p>
    }
    const handleGoogle = async (e) => {
        signInWithGoogle()

    }


    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col">

                    <div className="card w-full   lg:max-w-full shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Email</span>

                                    </label>
                                    <input {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is Required"
                                        },
                                        pattern: {
                                            value: /[A-Za-z]{3}/,
                                            message: 'error message'
                                        }
                                    })} type="email" placeholder="YOUR EMAIL" className="input input-bordered w-full max-w-xs" />
                                    <label className="label">
                                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}


                                    </label>
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Password</span>

                                    </label>
                                    <input {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })} type="password" placeholder="YOUR PASSWORD" className="input input-bordered w-full max-w-xs" />
                                    <label className="label">
                                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}


                                    </label>
                                </div>
                                {signInErrorMessage}
                                <input className='btn btn-primary text-white w-full max-w-xs' type="submit" value='Login' />
                            </form>
                            <p>New to doctors portal? <Link className='text-green-500' to="/signup">Create new Account</Link></p>
                            <div className="divider">OR</div>
                            <button onClick={handleGoogle} className="btn btn-outline btn-primary">Continue with google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;