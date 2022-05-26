
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Home from './components/Navbar/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import RequireAuth from './RequireAuth'
import CheckOutPage from './components/CheckOutPage/CheckOutPage'
import PurchaseSinglePage from './components/PurchaseSinglePage/PurchaseSinglePage';
import MyOrders from './components/MyOrders/MyOrders';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddReview from './components/AddReview/AddReview';
import MyProfile from './components/Navbar/Home/MyProfile/MyProfile';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard/Dashboard';
import User from './components/User/User';
import RequireAdmin from './components/Dashboard/RequireAdmin';
import AddProduct from './components/AddProduct/AddProduct';
import ManageAllOrders from './components/ManageAllOrders/ManageAllOrders';
import ManageProducts from './components/ManageProducts/ManageProducts';
import Blogs from './components/Blogs/Blogs';
import NotFound from './components/NotFound/NotFound';
import MyPortfolio from './components/MyPortfolio/MyPortfolio';
const stripePromise = loadStripe('pk_test_51L3gwAE59VKFUWlmDh48Nweo9Ep7j9ieG3FhMFhwyELP4UJqBpveAHtXApxWtf4Q3CNCALDLWhf6evtMILwI8HPr00xYl3d9Fp');
function App() {

  return (
    <div >

      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='my-portfolio' element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path='signup' element={<Signup></Signup>}></Route>
        <Route path='blogs' element={<Blogs></Blogs>}></Route>

        <Route path='dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route path='my-profile' element={<RequireAuth><MyProfile></MyProfile></RequireAuth>}></Route>
          <Route index element={<MyOrders></MyOrders>}></Route>
          <Route path='my-orders' element={<MyOrders></MyOrders>}></Route>
          <Route path='add-review' element={<AddReview></AddReview>}></Route>
          <Route path='user' element={<RequireAdmin><User></User></RequireAdmin>}></Route>
          <Route path='add-product' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='manage-all-orders' element={<RequireAdmin><ManageAllOrders></ManageAllOrders></RequireAdmin>}></Route>
          <Route path='manage-products' element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>
        </Route>
        <Route path='purchase/:id' element={<RequireAuth><PurchaseSinglePage></PurchaseSinglePage></RequireAuth>}></Route>


        <Route path='checkout/:paymentID' element={<RequireAuth><Elements stripe={stripePromise}>
          <CheckOutPage />
        </Elements></RequireAuth>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes >
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div >
  );
}

export default App;
