import axios from '../api/AxiosPrivate';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';

const User = () => {
    const { data: user, isLoading, refetch } = useQuery('all-user', async () => await axios.get('https://fathomless-ridge-40181.herokuapp.com/all-user'))


    if (isLoading) {
        return <Loading></Loading>
    }
    const makeAdmin = async (email, name) => {
        await axios.put(`https://fathomless-ridge-40181.herokuapp.com/user/admin/${email}`).then(response => console.log(response))
        refetch()
        toast.success(` you approved ${name || email} as admin.`)
    }
    const users = user.data

    const handleDeleteUser = async (id) => {
        await axios.delete(`https://fathomless-ridge-40181.herokuapp.com/user/${id}`)
        refetch()
        toast.success(`User Deleted`)
    }
    return (
        <div class="overflow-x-auto container">
            <h1 className="text-4xl"> All user : {user.data.length}</h1>
            <table class="table table-zebra w-full">

                <thead>
                    <tr>
                        <th></th>

                        <th>Email</th>
                        <th >Make Admin</th>
                        <th >Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users?.length > 0 && users.map((user, index) => <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.email}</td>
                            <td>{user.role !== 'admin' && <button onClick={() => makeAdmin(user.email, user.name)} className='btn-sm btn-success btn mr-4'>Make Admin</button>}</td>

                            <td><button onClick={() => handleDeleteUser(user._id)} className='btn-sm btn button-color'>Delete user</button></td>

                        </tr>

                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default User;