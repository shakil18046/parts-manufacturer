
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Part = () => {
    const [parts, setParts] = useState([])
    useEffect(() => {
        fetch('https://fathomless-ridge-40181.herokuapp.com/parts')
            .then(res => res.json())
            .then(data => setParts(data))
    }, [])
    console.log()
    const navigate = useNavigate()
    const sliceParts = parts.slice(0, 3)


    return (
        <div className=' grid lg:grid-cols-3 grid-cols-1 mt-10 gap-5 pr-[-32px] '>
            {
                sliceParts.map(product => <div key={product._id} className="card lg:max-w-full  bg-base-100 shadow-xl">
                    <figure><img src={product?.img} className="w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <div class="tooltip" data-tip={product.des}>
                            <button class="btn btn-ghost mb-10">{product.des.slice(0, 150)}</button>
                        </div>
                        <p className='font-bold'>Minimum Order Quantity: {product.minimunOrder}</p>
                        <p className='font-bold'>Available Order Quantity: {product.available}</p>
                        <p className='font-bold'>Price: {product.price}</p>

                        <div className="card-actions justify-start">
                            <button onClick={() => navigate(`/purchase/${product._id}`)} className="btn btn-primary">Order Now</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Part;