import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="materialContainer h-auto md:w-[60vw] w-auto border bg-black bg-opacity-50 p-6 shadow-lg rounded-2xl">
      <div className="material-details mb-4">
        <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
        <p className="text-gray-200">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="first_name">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="form-input text-white w-full border-b bg-transparent border-gray-300 p-2 outline-none"
              id="first_name"
              name="first_name"
              placeholder="Enter Your First Name"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="last_name">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="form-input text-white w-full border-b border-gray-300 p-2 bg-transparent outline-none"
              id="last_name"
              name="last_name"
              placeholder="Enter Your Last Name"
              required
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              className="form-input text-white w-full border-b border-gray-300 p-2 bg-transparent outline-none"
              id="email"
              name="email"
              placeholder="Enter Your Email Address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="phone_number">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="form-input text-white w-full border-b border-gray-300 p-2 bg-transparent outline-none"
              id="phone_number"
              name="phone_number"
              placeholder="Enter Your Phone Number"
              required
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2 col-span-1">
            <label className="block mb-1 font-medium text-white" htmlFor="comment">
              Comment <span className="text-red-600">*</span>
            </label>
            <textarea
              className="form-textarea text-white w-full border-b border-gray-300 p-2 bg-transparent outline-none"
              id="comment"
              name="comment"
              rows="3"
              required
              value={formData.comment}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="md:col-span-2 col-span-1 h-full w-full flex justify-center items-center">
            <button
              className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 
              text-white text-lg rounded-lg py-2 px-4 shadow-lg
              shadow-blue-500/50 hover:from-blue-300 hover:to-blue-800
              transition duration-300 transform hover:-translate-y-1 hover:scale-105 
              tracking-wider"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
