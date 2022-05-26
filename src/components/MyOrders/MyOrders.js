import axios from '../api/AxiosPrivate';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

const MyOrders = () => {
    const [ordersForModal, setOrdersForModal] = useState(null)
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const email = user?.email
    const { data: orders, isLoading, refetch } = useQuery('order', () => axios.get(`https://fathomless-ridge-40181.herokuapp.com/order?email=${email}`))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = (id) => {
        axios.delete(`https://fathomless-ridge-40181.herokuapp.com/order/${id}`).then(response => refetch())
    }
    const handlePayment = id => {
        navigate(`/checkout/${id}`)
    }

    return (
        <div>
            <h1 className='text-center text-4xl'>Your orders : {orders?.data?.length}</h1>
            <div className='container sm:container grid lg:grid-cols-3 grid-cols-1 gap-5 pr-[-32px] '>

                {
                    orders.data.map(product => <div key={product._id} className="card w-full  bg-base-100 shadow-xl">
                        <figure><img src={product?.img} className="w-1/2" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{product.des}</p>
                            <p className='font-bold'>Quantity: {product.quantity}</p>
                            <p className='font-bold'>Price: {product.price}</p>
                            {
                                product.paymentId && <p className='font-bold lg:text-xs flex flex-wrap text-green-600'>Payment id: {product.paymentId}</p>
                            }
                            <label disabled={product.payment} for="delete-confirm-modal-orders" onClick={() => {
                                setOrdersForModal(product)
                                refetch()
                            }} className='btn button-color'>Cancel</label>
                            <button disabled={product.payment} onClick={() => handlePayment(product._id)} class="btn ">{product.payment ? <>paid</> : <>pay</>}</button>

                        </div>
                    </div>)
                }
                {
                    ordersForModal && <DeleteConfirmModal ordersForModal={ordersForModal} orderDeleteRefetch={refetch}></DeleteConfirmModal>
                }
            </div>
        </div>
    );
};

export default MyOrders;