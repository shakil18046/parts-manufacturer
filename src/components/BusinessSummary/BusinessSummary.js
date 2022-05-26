
import React from 'react';
import './Business.css'
import { GiProgression } from 'react-icons/gi';
import { VscPreview } from 'react-icons/vsc';
import { BsTools } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
const BusinessSummary = () => {
    return (
        <div className='container mx-auto'> <h1 className="text-5xl text-center  mt-10 font-bold">Business Summary</h1>
            <div className=" container ">
                <div className=" grid my-20 grid-cols-1  lg:grid-cols-4 gap-20">


                    <div>
                        < GiProgression className='text-size'></GiProgression>
                        <p className="text-3xl font-bold"> 120M+ Annual revenue</p>

                    </div>
                    <div>
                        <VscPreview className='text-size'></VscPreview>
                        <p className="text-3xl font-bold"> 33K+ Reviews</p>
                    </div>
                    <div>
                        <BsTools className='text-size'></BsTools>
                        <p className="text-3xl font-bold">50+ Tools</p>
                    </div>
                    <div>
                        <IoIosPeople className='text-size'></IoIosPeople>
                        <p className="text-3xl font-bold">Served 100+ customers</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BusinessSummary;