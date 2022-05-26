import axios from '../api/AxiosPrivate';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';

const PurchaseSinglePage = () => {
    const [user] = useAuthState(auth)
    const [orderQuantity, setOrderQuantity] = useState(0)
    const [quantityError, setQuantityError] = useState('',)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const { id } = useParams()
    const { data: product, isLoading, refetch } = useQuery(('parts', id), () => axios.get(`https://fathomless-ridge-40181.herokuapp.com/parts/${id}`))
    const products = product?.data
    useEffect(() => {
        const orderQantityMinimumParseInt = parseInt(product?.data.minimunOrder)
        setOrderQuantity(orderQantityMinimumParseInt)



    }, [product])
    if (isLoading) {
        return <Loading></Loading>
    }

    const handleNewQuantity = e => {
        const newQuantity = parseInt(e.target.value);

        setOrderQuantity(newQuantity)
        if (newQuantity < parseInt(product?.data.minimunOrder)) {
            setQuantityError("you Can not add less than Minimum Order Quantity")
            setButtonDisabled(true)
        }
        else if (newQuantity > parseInt(product?.data.available)) {
            setQuantityError("you Can not add higher than available Quantity")
            setButtonDisabled(true)
        }
        else {

            setQuantityError('')
            setButtonDisabled(false)
        }
    }
    const hanldeSubmit = e => {
        e.preventDefault()
        const price = orderQuantity * parseInt(product.data.price)

        const order = {
            email: e.target.email.value,
            phone: e.target.phone.value,
            quantity: orderQuantity,
            address: e.target.address.value,
            img: product.data.img,
            price: price,
            name: product.data.name,

        }
        axios.post('https://fathomless-ridge-40181.herokuapp.com/order', order).then(response => {

            console.log(response.data);
        })
        let newAvailableQuantity = parseInt(product?.data.available) - orderQuantity;
        const doc = {
            available: newAvailableQuantity
        }

        axios.put(`https://fathomless-ridge-40181.herokuapp.com/parts/${id}`, doc).then(response => {

            refetch()
        })
        toast.success(`Order Successful`)
    }
    return (
        <div className='container sm:container my-20'>
            <div>
                <div className='text-center  mb-4'>
                    <h1>Your Name: {user?.displayName}</h1>
                    <h1>Your Email: {user?.email}</h1>
                </div>
                <div className=''>
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <figure><img className='w-full' src={products.img} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{products.name}</h2>
                            <p>{products.des}</p>
                            <p>Minimum Order Quantity: {products.minimunOrder}</p>
                            <p>Available: {products.available}</p>
                            <p>Price: {products.price}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-1 justify-center '>
                    <div className="card w-full mt-20 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-4xl text-center">Order info</h2>

                            <form onSubmit={hanldeSubmit}>
                                <label htmlFor="email">Email</label>
                                <input name='email' type="email" placeholder="email" disabled value={user?.email} className="input input-bordered input-xs w-full " />
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered input-sm w-full " />
                                <label htmlFor="quantity">Order Quantity</label>
                                {
                                    quantityError && <small className='text-red-500'>{quantityError}</small>
                                }
                                <input required onChange={handleNewQuantity} name='orederQuantity' value={orderQuantity} type="number" className="input input-bordered input-md w-full " />
                                <label htmlFor="address">Address</label>
                                <input name='address' type="text" placeholder="Address" className="input input-bordered input-lg w-full" />
                                <div className="card-actions justify-end">
                                    <button disabled={buttonDisabled} type='submit' className="btn btn-primary">Order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PurchaseSinglePage;