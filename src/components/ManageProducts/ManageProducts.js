import axios from '../api/AxiosPrivate';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { async } from '@firebase/util';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

const ManageProducts = () => {
    const [product, setProduct] = useState(null)
    const { data, isLoading, refetch } = useQuery("parts", () => axios.get('https://fathomless-ridge-40181.herokuapp.com/parts'))
    if (isLoading) {
        return <Loading></Loading>
    }

    const products = data.data
    console.log(product);
    return (
        <div className='container'>
            <div class="overflow-x-auto">
                <h1 className="text-4xl"> All Product :{products.length} </h1>
                <table class="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th >Minimun Order</th>
                            <th >Available</th>
                            <th >Price</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.length > 0 && products.map((product, index) => <tr key={product._id}>
                                <th>{index + 1}</th>

                                <td>{product.name}</td>
                                <td>{product.minimunOrder}</td>
                                <td>{product.available}</td>
                                <td>{product.price}</td>
                                <td><label onClick={() => setProduct(product)} for="delete-confirm-modal" className='btn button-color'>Delete Product</label></td>
                            </tr>

                            )
                        }
                        {
                            product && <DeleteConfirmModal refetch={refetch} product={product}></DeleteConfirmModal>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;