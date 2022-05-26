import React from 'react';


const GetInTouch = () => {
    return (
        <div style={{ background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${"https://i.ibb.co/hYV4wMk/istockphoto-1212230930-170667a.jpg"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className='flex justify-center container py-16 '>
                <div>
                    <div>
                        <h4 className='text-3xl text-secondary'> Contact us</h4>
                        <h1 className='text-4xl text-white '>Stay connected with us</h1>
                    </div>



                    <div className='text-center flex-col justify-ceneter my-10'>
                        <input type="text" placeholder="Email" className="input block input-bordered my-5 h-12 input-md w-full max-w-lg" />
                        <input type="text" placeholder="Subject" className="input h-12 block input-bordered my-5  input-md w-full max-w-lg" />

                        <textarea type="text" placeholder="Type here" className="textarea block  h-32 w-full max-w-lg  my-5  textarea-accent" />
                        <button className="btn btn-primary uppercases my-5  text-white font-bold  ">Get Started</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default GetInTouch;