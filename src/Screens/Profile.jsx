
import React, { useState, useEffect } from 'react';
import { FaUser, FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaEdit, FaTrash } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import useAuthStore from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useCheckoutStore from '../Context/CheckoutContext';
import useOrderStore from '../Context/OrderContext';
import OrderList from '../Components/listing/OrderList';

function Profile() {
  const email = localStorage.getItem('userEmail') || 'mohd.yaseen@example.com';
  const userName = localStorage.getItem('user') || 'User';
  // const userName = "Mohd Yaseen";
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  // const { fetchOrders,orders: apiOrders } = useCheckoutStore();
  const {fetchOrders, orders } = useOrderStore();

  // State for orders from API

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewOrderDetails = (order) => {
    navigate(`/order/${order.id}`, { state: { order } });
  };

  // Custom dialog header templates
  const addressDialogHeader = (
    <div className="flex items-center gap-3">
      <FaMapMarkerAlt className="text-purple-500 text-xl" />
      <span className="text-lg font-semibold">Add New Address</span>
    </div>
  );

  const paymentDialogHeader = (
    <div className="flex items-center gap-3">
      <FaCreditCard className="text-green-500 text-xl" />
      <span className="text-lg font-semibold">Add Payment Method</span>
    </div>
  );

 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-10">
      {/* Profile Header */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 py-8 px-4 shadow-md">
        <div className=" mx-auto flex flex-col items-center">
          <div className="relative md:pt-12 pt-8">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
              <FaUser className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">{userName}</h1>
          <p className="text-blue-100">{email}</p>
          
          <button onClick={handleLogout} className="mt-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
            <RiLogoutCircleLine className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Sections */}
      <div className=" mx-auto px-4 py-6 space-y-6">
    
        <OrderList orders={orders} />

      
      </div>

     
    </div>
  );
}

export default Profile;