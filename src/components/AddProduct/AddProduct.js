import axios from '../api/AxiosPrivate';
import React from 'react';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const handleSubmit = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const des = e.target.description.value;
        const minimunOrder = e.target.minimumQuantity.value;
        const available = e.target.availeable.value;
        const price = e.target.price.value;
        const img = e.target.img.value
        axios.post('https://fathomless-ridge-40181.herokuapp.com/parts', {
            name, des, minimunOrder, available, price, img
        }).then(response => toast.success("item added"))

    }
    return (
        <div>
            <form onSubmit={handleSubmit} class="card-body">
                <h2 class="card-title">Want to Add a Product</h2>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input required type="text" name='name' class="input input-bordered" />
                </div><div class="form-control">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <input required type="text" name='description' class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Minimun Quantity</span>
                    </label>
                    <input required type="text" name='minimumQuantity' class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Available Quantity</span>
                    </label>
                    <input required type="text" name='availeable' class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Price</span>
                    </label>
                    <input required type="text" name='price' class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Image Link</span>
                    </label>
                    <input required type="text" name='img' class="input input-bordered" />
                </div>
                <div class="card-actions justify-center">
                    <button type='submit' class="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;