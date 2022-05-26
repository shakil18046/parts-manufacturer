import React from 'react';
import NotFoundImg from '../../Assets/img/404.gif'

const NotFound = () => {
    return (
        <div className='text-center flex justify-center'>
            <img className='text-center' src={NotFoundImg} alt="" />
        </div>
    );
};

export default NotFound;