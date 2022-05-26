
import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../Hooks/useToken';
import Loading from '../Shared/Loading';

const Signup = () => {
    const navigate = useNavigate()
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(user || gUser)


    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });


    };

    const handleGoogle = async (e) => {
        signInWithGoogle()


    }
    console.log(token);
    if (token) {
        navigate('/dashboard')
        console.log(token);
    }
    let signInErrorMessage;
    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInErrorMessage = <p className="text-red-500"><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }



    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col">

                <div className="card w-full   lg:max-w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>

                                </label>
                                <input {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is Required"
                                    },

                                })} type="text" placeholder="YOUR NAME" className="input input-bordered w-full max-w-xs" />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}



                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
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
                            <div className="form-control w-full max-w-xs">
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
                            <input className='btn btn-primary text-white w-full max-w-xs' type="submit" value='SignUp' />
                        </form>
                        <p>Alreay have an Account? <Link className='text-green-500' to="/login">Please Login</Link></p>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogle} className="btn btn-primary btn-outline">Continue with google</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Signup;