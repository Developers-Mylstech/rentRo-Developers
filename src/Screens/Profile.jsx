
// import React, { useState, useEffect } from 'react';
// import { FaUser, FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaEdit, FaTrash } from 'react-icons/fa';
// import { RiLogoutCircleLine } from 'react-icons/ri';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { Card } from 'primereact/card';
// import useAuthStore from '../Context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import useCheckoutStore from '../Context/CheckoutContext';
// import useOrderStore from '../Context/OrderContext';
// import OrderList from '../Components/listing/OrderList';

// function Profile() {
//   const email = localStorage.getItem('userEmail') || 'mohd.yaseen@example.com';
//   const userName = localStorage.getItem('user') || 'User';
//   // const userName = "Mohd Yaseen";
//   const { logout } = useAuthStore();
//   const navigate = useNavigate();
//   // const { fetchOrders,orders: apiOrders } = useCheckoutStore();
//   const {fetchOrders, orders } = useOrderStore();

//   // State for orders from API

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);
  
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const handleViewOrderDetails = (order) => {
//     navigate(`/order/${order.id}`, { state: { order } });
//   };

//   // Custom dialog header templates
//   const addressDialogHeader = (
//     <div className="flex items-center gap-3">
//       <FaMapMarkerAlt className="text-purple-500 text-xl" />
//       <span className="text-lg font-semibold">Add New Address</span>
//     </div>
//   );

//   const paymentDialogHeader = (
//     <div className="flex items-center gap-3">
//       <FaCreditCard className="text-green-500 text-xl" />
//       <span className="text-lg font-semibold">Add Payment Method</span>
//     </div>
//   );

 

//   return (
//     <div className="min-h-screen bg-gray-50  pb-10">
//       {/* Profile Header */}
//       <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 py-8 px-4 shadow-md">
//         <div className=" mx-auto flex flex-col items-center">
//           <div className="relative md:pt-12 pt-8">
//             <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
//               <FaUser className="text-4xl text-white" />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-white mt-4">{userName}</h1>
//           <p className="text-blue-100">{email}</p>
          
//           <button onClick={handleLogout} className="mt-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
//             <RiLogoutCircleLine className="text-lg" />
//             <span>Sign Out</span>
//           </button>
//         </div>
//       </div>

//       {/* Profile Sections */}
//       <div className=" mx-auto px-4 py-6 space-y-6">
    
//         <OrderList orders={orders} />

      
//       </div>

     
//     </div>
//   );
// }

// export default Profile;



// pages/Profile.jsx






import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaBoxOpen, 
  FaMapMarkerAlt,
  FaHome,
  FaHistory
} from 'react-icons/fa';
import { FaBagShopping } from "react-icons/fa6";
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import useAuthStore from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import useOrderStore from '../Context/OrderContext';
import OrderList from '../Components/listing/OrderList';
import PersonalDetails from '../Components/PersonalDetails';
import AddressList from '../Components/AddressList';
import JobApplications from '../Components/JobApplications';
import WishlistScreen from './WishlistScreen';

function Profile() {
  const email = localStorage.getItem('userEmail') || 'mohd.yaseen@example.com';
  const userName = localStorage.getItem('user') || 'User';
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchOrders, orders } = useOrderStore();
  const [activeTab, setActiveTab] = useState('orders');
 

  // Initialize with orders tab if no hash or invalid hash
  useEffect(() => {
    const hash = location.hash.substring(1);
    if (['personal', 'addresses', 'orders','jobapplication'].includes(hash)) {
      setActiveTab(hash);
    } else {
      navigate('#orders', { replace: true });
    }
  }, [location.hash, navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalDetails user={{ name: userName, email }} />;
      case 'wishlist':
        return <WishlistScreen />;
      case 'addresses':
        return <AddressList />;
      case 'jobapplication':
        return <JobApplications />;
      case 'orders':
      default:
        return <OrderList orders={orders} />;
    }
  };

  // Custom dialog header template


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white shadow-md md:min-h-screen ">
        {/* Profile Header in Sidebar */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 py-8 px-4 shadow-md pt-20">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                <FaUser className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-white mt-4">{userName}</h1>
            <p className="text-blue-100 text-sm">{email}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4  space-y-2">
          {/* <button
            onClick={() => setActiveTab('jobapplication')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'personal' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaUser className="text-lg" />
            <span>Job Application</span>
          </button> */}

          <button
            onClick={() => setActiveTab('personal')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'personal' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaUser className="text-lg" />
            <span>Personal Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaMapMarkerAlt className="text-lg" />
            <span>Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaBagShopping className="text-lg" />
            <span>Wishlist</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <FaBoxOpen className="text-lg" />
            <span>My Orders</span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-6"
          >
            <RiLogoutCircleLine className="text-lg" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>


      <div className="flex-1 p-2 ">

        <div className="mb-6 flex justify-between items-center">
          {/* <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab === 'personal' && 'Personal Details'}
            {activeTab === 'addresses' && 'My Addresses'}
            {activeTab === 'orders' && 'Order History'}
          </h2> */}
          
          
        </div>

     
        <div className="bg-white rounded-xl shadow-sm p-6">
          {renderActiveTab()}
        </div>
      </div>

 
    </div>
  );
}

export default Profile;