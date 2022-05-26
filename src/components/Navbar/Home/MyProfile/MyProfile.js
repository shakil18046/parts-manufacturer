import React, { useEffect } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import userImg from "../../../../Assets/img/user.png"

import axios from "axios";
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [updateProfile, updating, error] = useUpdateProfile(auth);

    const { data: userData, isLoading, refetch } = useQuery('user', () => axios.get(`https://fathomless-ridge-40181.herokuapp.com/user?email=${user?.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }))
    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(userData);
    const handleUpdate = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const address = e.target.address.value
        const phone = e.target.phone.value

        const linkedin = e.target.linkedin.value

        await updateProfile({ displayName: name });
        await axios.put(`https://fathomless-ridge-40181.herokuapp.com/user-update?email=${user?.email}`, { name, address, phone, linkedin, email: user.email }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        refetch()
        toast.success("Update Successfully")
        e.target.name.value = ''
        e.target.address.value = ''
        e.target.phone.value = ''
        e.target.linkedin.value = ''


    }

    return (
        <div className='container sm:conatiner'>
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure ><img src={userImg} alt="" /></figure>
                <div class="card-body items-center">
                    <h2 class="lg:card-title">User Name: {user?.displayName}</h2>
                    <h2 class="lg:card-title">User Email: {user?.email}</h2>
                    <h2 class="lg:card-title">User address: {userData.data.address}</h2>
                    <h2 class="lg:card-title">User Phone: {userData.data.phone}</h2>
                    <h2 class="lg:card-title">User Linkedin: {userData.data.linkedin}</h2>
                </div>
            </div>
            <div className='flex justify-center my-10'>
                <div class="card sm:w-9/12 bg-base-100 shadow-xl">
                    <form onSubmit={handleUpdate} class="card-body">
                        <h2 class="card-title">Want to Update Profile</h2>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input required type="text" name='name' class="input input-bordered" />
                        </div><div class="form-control">
                            <label class="label">
                                <span class="label-text">Address</span>
                            </label>
                            <input required type="text" name='address' class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Phone</span>
                            </label>
                            <input required type="text" name='phone' class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">LinkedIn Profile link</span>
                            </label>
                            <input required type="text" name='linkedin' class="input input-bordered" />
                        </div>
                        <div class="card-actions justify-center">
                            <button type='submit' class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;