import { async } from '@firebase/util';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../api/AxiosPrivate';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

const CheckOutPage = () => {

    const [error, SetError] = useState('')
    const { paymentID } = useParams();
    const { data, isLoading } = useQuery(['order', paymentID], () => axios.get(`https://fathomless-ridge-40181.herokuapp.com/order/${paymentID}`))
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('')
    const [paymentId, setPaymentId] = useState('')

    const stripe = useStripe();
    const elements = useElements();
    const price = parseInt(data?.data.price)
    const email = data?.data.email
    useEffect(() => {
        axios.post(`https://fathomless-ridge-40181.herokuapp.com/create-payment-intent`, { price }).then(response => setClientSecret(response.data.clientSecret))
    }, [price]);
    if (isLoading) {
        return <Loading></Loading>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {

            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        setSuccess('')
        setPaymentId('')
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: email,
                },
            },
        })
            .then(function (result) {
                // Handle result.error or result.paymentIntent
                if (result.error) {
                    SetError(result.error.message)
                }
                if (result.paymentIntent) {
                    setPaymentId(result.paymentIntent.id)
                    axios.post('https://fathomless-ridge-40181.herokuapp.com/payment', {
                        paymentId: paymentId,
                        price: price,
                        quantity: data?.data.quantity,
                        email: email,
                        name: data?.data.name

                    })

                    axios.put(`https://fathomless-ridge-40181.herokuapp.com/order/${paymentID}`, { payment: true, paymentId: result.paymentIntent.id })
                }

            });
        if (error) {
            console.log(error);
            SetError(error.message)
            setSuccess('')
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            SetError('')
            setSuccess('Your Payment is completed')


        }
    }
    return (
        <div>
            <div className='flex justify-center my-12'>

                <div className="card lg:w-1/2 w-full  bg-base-100 shadow-xl">

                    <div className="card-body">
                        <h2 className="card-title">{data?.data.name}</h2>

                        <p className='font-bold'>Quantity: {data?.data.quantity}</p>

                        <p className='font-bold'>Please pay: ${data?.data.price}</p>

                        <form className='card-body shadow-xl rounded-xl my-12' onSubmit={handleSubmit}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />

                            <button className='btn mt-10 btn-outline btn-success w-sm' type="submit" disabled={!stripe || !clientSecret}>
                                Pay
                            </button>
                        </form>
                        {
                            <p className='text-red-500'>{error}</p>
                        }
                        {
                            <p className='text-green-500'>{success}</p>
                        }
                        {
                            paymentId && <p>Your Payment id: <span className='text-green-500'>{paymentId}</span> </p>
                        }
                    </div>
                </div>

            </div>
            <div >
                <div className='card lg:max-w-sm flex justify-items-center  bg-base-100 shadow-xl'>

                </div>
            </div>
        </div>
    );
};

export default CheckOutPage;