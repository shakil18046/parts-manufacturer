import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../Hooks/useAdmin';
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsNodePlus } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";




const Dashboard = () => {

    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    console.log(admin);
    return (
        <div class="drawer  drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content ">
                <Outlet></Outlet>


            </div>
            <div class="drawer-side colo-base-200">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-50 bg-base-200  text-base-content">

                    <li><Link to='my-profile'> <BsFillPersonFill    ></BsFillPersonFill> My Profile</Link></li>
                    {
                        admin.admin ? '' : <li><Link to='add-review'><MdRateReview></MdRateReview>Add Review</Link></li>
                    }
                    {
                        admin.admin ? '' : <li><Link to='my-orders'><AiOutlineShoppingCart></AiOutlineShoppingCart> Orders</Link></li>
                    }
                    {
                        admin.admin && <li><Link to='user'><BsFillPersonPlusFill></BsFillPersonPlusFill> Make Admin</Link></li>
                    }
                    {
                        admin.admin && <li><Link to='add-product'><BsNodePlus></BsNodePlus> Add Product</Link></li>
                    }
                    {
                        admin.admin && <li><Link to='manage-all-orders'> <MdProductionQuantityLimits></MdProductionQuantityLimits> Manage All Orders</Link></li>
                    }
                    {
                        admin.admin && <li><Link to='manage-products'> <MdManageAccounts></MdManageAccounts>Manage Products</Link></li>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;