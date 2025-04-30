import React, { useState } from 'react';
import { FaUser, FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaEdit, FaTrash } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';

function Profile() {
  const email = localStorage.getItem('signupEmail') || 'mohd.yaseen@example.com';
  const userName = "Mohd Yaseen";

  // Fake data
  const [orders, setOrders] = useState([
    { id: 1, date: '2023-05-15', total: 149.99, status: 'Delivered', items: 3 },
    { id: 2, date: '2023-06-22', total: 89.99, status: 'Shipped', items: 2 }
  ]);

  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
    { id: 2, name: 'Work', street: '456 Business Ave', city: 'New York', state: 'NY', zip: '10002', isDefault: false }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '06/24', isDefault: false }
  ]);

  // Dialog states
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', street: '', city: '', state: '', zip: '', isDefault: false });
  const [newPayment, setNewPayment] = useState({ type: '', number: '', expiry: '', cvv: '', isDefault: false });

  // States for dropdowns
  const states = [
    { label: 'New York', value: 'NY' },
    { label: 'California', value: 'CA' },
    { label: 'Texas', value: 'TX' }
  ];

  const cardTypes = [
    { label: 'Visa', value: 'Visa' },
    { label: 'Mastercard', value: 'Mastercard' },
    { label: 'American Express', value: 'Amex' }
  ];

  const handleAddAddress = () => {
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    setShowAddressDialog(false);
    setNewAddress({ name: '', street: '', city: '', state: '', zip: '', isDefault: false });
  };

  const handleAddPayment = () => {
    const last4 = newPayment.number.slice(-4);
    setPaymentMethods([...paymentMethods, { ...newPayment, last4, id: paymentMethods.length + 1 }]);
    setShowPaymentDialog(false);
    setNewPayment({ type: '', number: '', expiry: '', cvv: '', isDefault: false });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleDeletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
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
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative md:pt-12 pt-8">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
              <FaUser className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">{userName}</h1>
          <p className="text-blue-100">{email}</p>
          
          <button className="mt-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
            <RiLogoutCircleLine className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Orders Section */}
        <Card className="shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
              <FaBoxOpen className="text-orange-500 dark:text-orange-400 text-xl" />
            </div>
            <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-200">My Orders</h2>
          </div>
          <div className="p-4">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {order.items} item{order.items > 1 ? 's' : ''} purchased
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                <FaBoxOpen className="text-4xl mb-3" />
                <p>No orders yet</p>
                <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Browse Products
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Address Section */}
        <Card className="shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-purple-500 dark:text-purple-400 text-xl" />
              </div>
              <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Saved Addresses</h2>
            </div>
            <button 
              onClick={() => setShowAddressDialog(true)}
              className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg transition-colors"
            >
              Add New
            </button>
          </div>
          <div className="p-4">
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(address => (
                  <div key={address.id} className={`p-4 border rounded-lg relative ${
                    address.isDefault ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}>
                    <div className="flex justify-between">
                      <h3 className="font-medium">{address.name}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm mt-2">{address.street}</p>
                    <p className="text-sm">{address.city}, {address.state} {address.zip}</p>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                      >
                        Set Default
                      </button>
                      <button 
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 px-2 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                <FaMapMarkerAlt className="text-4xl mb-3" />
                <p>No saved addresses</p>
              </div>
            )}
          </div>
        </Card>

        {/* Payment Section */}
        <Card className="shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <FaCreditCard className="text-green-500 dark:text-green-400 text-xl" />
              </div>
              <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Payment Methods</h2>
            </div>
            <button 
              onClick={() => setShowPaymentDialog(true)}
              className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors"
            >
              Add New
            </button>
          </div>
          <div className="p-4">
            {paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map(payment => (
                  <div key={payment.id} className={`p-4 border rounded-lg ${
                    payment.isDefault ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{payment.type} •••• {payment.last4}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Expires {payment.expiry}</p>
                      </div>
                      {payment.isDefault && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Default</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => handleSetDefaultPayment(payment.id)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                      >
                        Set Default
                      </button>
                      <button 
                        onClick={() => handleDeletePayment(payment.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 px-2 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                <FaCreditCard className="text-4xl mb-3" />
                <p>No payment methods saved</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Add Address Dialog */}
      <Dialog 
        header={addressDialogHeader}
        visible={showAddressDialog} 
        style={{ width: '90vw', maxWidth: '500px' }}
        onHide={() => setShowAddressDialog(false)}
        className="rounded-lg shadow-xl"
        contentClassName="bg-white dark:bg-gray-800"
        headerClassName="border-b border-gray-200 dark:border-gray-700"
        breakpoints={{ '960px': '75vw', '640px': '90vw' }}
        blockScroll
      >
        <div className="space-y-4 p-4">
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address Name</label>
            <InputText 
              value={newAddress.name}
              onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
              placeholder="e.g. Home, Work"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
            <InputText 
              value={newAddress.street}
              onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
              placeholder="123 Main St"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="field">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
              <InputText 
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                placeholder="City"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="field">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
              <Dropdown 
                value={newAddress.state}
                options={states}
                onChange={(e) => setNewAddress({...newAddress, state: e.value})}
                placeholder="Select State"
                className="w-full border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                panelClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
              />
            </div>
          </div>
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
            <InputText 
              value={newAddress.zip}
              onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
              placeholder="12345"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              id="defaultAddress"
              checked={newAddress.isDefault}
              onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Set as default address
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setShowAddressDialog(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddAddress}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-md"
            >
              Save Address
            </button>
          </div>
        </div>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog 
        header={paymentDialogHeader}
        visible={showPaymentDialog} 
        style={{ width: '90vw', maxWidth: '500px' }}
        onHide={() => setShowPaymentDialog(false)}
        className="rounded-lg shadow-xl"
        contentClassName="bg-white dark:bg-gray-800"
        headerClassName="border-b border-gray-200 dark:border-gray-700"
        breakpoints={{ '960px': '75vw', '640px': '90vw' }}
        blockScroll
      >
        <div className="space-y-4 p-4">
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Type</label>
            <Dropdown 
              value={newPayment.type}
              options={cardTypes}
              onChange={(e) => setNewPayment({...newPayment, type: e.value})}
              placeholder="Select Card Type"
              className="w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              panelClassName="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
            />
          </div>
          <div className="field">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
            <InputText 
              value={newPayment.number}
              onChange={(e) => setNewPayment({...newPayment, number: e.target.value})}
              placeholder="4242 4242 4242 4242"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="field">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
              <InputText 
                value={newPayment.expiry}
                onChange={(e) => setNewPayment({...newPayment, expiry: e.target.value})}
                placeholder="MM/YY"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="field">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
              <InputText 
                value={newPayment.cvv}
                onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value})}
                placeholder="123"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              id="defaultPayment"
              checked={newPayment.isDefault}
              onChange={(e) => setNewPayment({...newPayment, isDefault: e.target.checked})}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="defaultPayment" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Set as default payment method
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setShowPaymentDialog(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddPayment}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-md"
            >
              Save Payment Method
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Profile;