import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='container'>
            <h1 className='text-center font-bold'>Md shakil hossain</h1>
            <p className='text-center font-bold'> Email: shakil18046@yahoo.com</p>
            <div>

                <div class="divider"></div>
                <h1 className='text-2xl font-bold mb-3'>Education Background:</h1>
                <p > <b>Higher Secondary School certificate (HSC)</b></p>

                govt shahid suhrawardy college

                Lakshmi Bazaar, Dhaka 1100.
                <div class="divider"></div>
                <h1 className='text-2xl font-bold'>List of technologies:</h1>
                <ul className='list-disc list-inside '>
                    <li>JavaScript</li>
                    <li>ES6</li>
                    <li>REST API</li>
                    <li>React.js</li>
                    <li>SPA</li>
                    <li>React Hooks</li>
                    <li>React Router</li>
                    <li>HTML5</li>
                    <li>CSS3 </li>
                    <li>Bootstrap5 </li>
                    <li>Tailwind Css </li>
                    <li>Firebase</li>
                    <li>Firebase Hook</li>
                </ul>

            </div>
            <div class="divider"></div>
            <div className='mb-4'>
                <h1 className='text-2xl font-bold'>Project:</h1>
                <ul className='list-disc list-inside '>
                    <li> <a className='text-info' target={"blank"} href="https://gym-trainer-4e31f.web.app/">Independant Service provider website</a></li>
                    <li> <a className='text-info' target={"blank"} href="https://assignment-eleven-47636.web.app/">Warehouse management site</a></li>
                </ul>
            </div>
        </div>
    );
};

export default MyPortfolio;