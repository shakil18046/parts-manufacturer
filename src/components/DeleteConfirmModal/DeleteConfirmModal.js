import axios from '../api/AxiosPrivate';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ product, refetch, ordersForModal, orderDeleteRefetch }) => {
    const handleDeleteProduct = async (id) => {
        await axios.delete(`https://fathomless-ridge-40181.herokuapp.com/part/${id}`)
        refetch()
        toast.success('Item deleted')
    }
    const handleDeleteOrder = async (id) => {
        await axios.delete(`https://fathomless-ridge-40181.herokuapp.com/order/${id}`)
        orderDeleteRefetch()
        toast.success('Item deleted')
    }
    console.log(ordersForModal);
    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Are you sure you want to delete?</h3>
                    <p class="py-4">You are deleting : {product?.name}</p>
                    <div class="modal-action">
                        <label for="delete-confirm-modal" class="btn btn-success">Close</label>
                        <label onClick={() => handleDeleteProduct(product._id)} for="delete-confirm-modal" class="btn button-color">Delete</label>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="delete-confirm-modal-orders" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Are you sure you want to delete?</h3>
                    <p class="py-4">You are deleting : {ordersForModal?.name}</p>
                    <div class="modal-action">
                        <label for="delete-confirm-modal-orders" class="btn btn-success">Close</label>
                        <label onClick={() => handleDeleteOrder(ordersForModal._id)} for="delete-confirm-modal-orders" class="btn button-color">Delete</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;