import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const logOut = e => {
        signOut(auth)
        localStorage.removeItem('accessToken')
    }
    return (
        <div class="navbar text-white bg-primary">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-accent rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        {
                            user && <li><Link to='dashboard'>Dashboard</Link></li>
                        }
                        <li><Link to='blogs'>Blogs</Link></li>
                        <li><Link to='my-portfolio'>Portfolio</Link></li>

                        {
                            user && <li><button className='btn btn-ghost'>Name: {user?.displayName}</button></li>
                        }

                        {
                            user ? <li><button onClick={logOut} className='btn   button-color' >Sign Out</button></li> : <li><Link to='login'>Login</Link></li>
                        }
                    </ul>

                </div>
                <Link to='/' class="btn btn-ghost normal-case text-xl">Zaka Parts</Link>

                <div className="navbar-end">

                    <label for="my-drawer-2" tabindex="1" class="btn btn-ghost   lg:hidden">
                        <small>Menu For Dashboard</small>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5  w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
            <div class="navbar-center lg:justify-end hidden lg:flex">
                <ul class="menu justify-end menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>

                    {
                        user && <li><Link to='dashboard'>Dashboard</Link></li>
                    }
                    <li><Link to='blogs'>Blogs</Link></li>
                    <li><Link to='my-portfolio'>Portfolio</Link></li>

                    {
                        user && <li><button className='btn btn-link'>Name: {user?.displayName}</button></li>
                    }

                    {
                        user ? <li><button onClick={logOut} className='btn   button-color' >Sign Out</button></li> : <li><Link to='login'>Login</Link></li>
                    }


                </ul>
            </div>

        </div>
    );
};

export default Navbar;