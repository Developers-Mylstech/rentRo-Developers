// // Components/profile/PersonalDetails.jsx
// import React,{ useEffect, useState } from 'react';
// import { FaEdit } from 'react-icons/fa';
// import useUserStore from "../Context/UserContext"
 
// const PersonalDetails = ({ user }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user.name,
//     email: user.email,
//     phone: ''
//   });
//   const { updateUser,fetchUser, userDetails } = useUserStore();



//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   useEffect(()=>{
//     fetchUser()
//   },[])

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save logic here
//     setIsEditing(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-medium">Personal Information</h3>
//         {!isEditing && (
//           <button 
//             onClick={() => setIsEditing(true)}
//             className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
//           >
//             <FaEdit />
//             <span>Edit</span>
//           </button>
//         )}
//       </div>

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               disabled
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               placeholder="Add phone number"
//             />
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
//               Save Changes
//             </button>
//             <button 
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="space-y-4">
//           <div>
//             <p className="text-sm text-gray-500">Full Name</p>
//             <p className="text-gray-800">{formData.name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="text-gray-800">{formData.email}</p>
//           </div>
//           {formData.phone && (
//             <div>
//               <p className="text-sm text-gray-500">Phone Number</p>
//               <p className="text-gray-800">{formData.phone}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PersonalDetails;



// Components/profile/PersonalDetails.jsx
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import useUserStore from "../Context/UserContext";
import { Toast } from 'primereact/toast';

const PersonalDetails = () => {
  const toast = React.useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { updateUser, fetchUser, userDetails } = useUserStore();
  
  useEffect(() => {
      fetchUser(); // Fetch latest user data when component mounts
    }, [fetchUser]);
    
    const [formData, setFormData] = useState({
      name: userDetails.name ,
      email: userDetails.email,
      phone: userDetails.phone,
    });
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the update data (only include changed fields if needed)
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        // Note: email is not included as it's typically not updatable
      };

      await updateUser(updateData);
      showToast('success', 'Success', 'Profile updated successfully');
      setIsEditing(false);
      fetchUser(); // Refresh user data after update
    } catch (error) {
      console.error("Failed to update profile:", error);
      showToast('error', 'Error', 'Failed to update profile');
    }
  };

  return (
    <div className="space-y-6 ">
      <Toast ref={toast} />
      
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
       
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              minLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Save Changes
            </button>
            <button 
              type="button"
              onClick={() => {
                setIsEditing(false);
                // Reset form to original values
                setFormData({
                  name: userDetails.name,
                  email: userDetails.email,
                  phone: userDetails.phone ,
                });
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-gray-800 font-medium">{userDetails.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">{userDetails.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-gray-800 font-medium">
              {userDetails.phone || 'Not provided'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Status</p>
            <p className="text-gray-800 font-medium">
              {userDetails.verified ? (
                <span className="text-green-600">Verified</span>
              ) : (
                <span className="text-yellow-600">Not Verified</span>
              )}
            </p>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;