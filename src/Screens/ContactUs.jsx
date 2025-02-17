import React, { useState } from "react";
import BottomNav from "../Components/BottomNav";
import OceanScene from "../Components/OceanScene";
import contactBg from "../assets/contactBg.jpg";
import "../index.css";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const ContactUs = () => {
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
    <>
      {/* <OceanScene /> */}
      <section
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="contact-section pt-4"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-full w-full justify-center items-center py-16">
            {/* Form Section */}
            <div className="materialContainer h-auto md:w-[60vw] w-auto border  bg-black bg-opacity-50 p-6 shadow-lg rounded-2xl">
              <div className="material-details mb-4">
                <h2 className="text-3xl font-semibold text-white">
                  Contact Us
                </h2>
                <p className="text-gray-200">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      className="block mb-1 font-medium text-white"
                      htmlFor="first_name"
                    >
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input text-white w-full border-b bg-transparent border-gray-300 p-2 outline-none "
                      id="first_name"
                      name="first_name"
                      placeholder="Enter Your First Name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium text-white"
                      htmlFor="last_name"
                    >
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input text-white w-full border-b border-gray-300 p-2 bg-transparent  outline-none "
                      id="last_name"
                      name="last_name"
                      placeholder="Enter Your Last Name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium text-white"
                      htmlFor="email"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-input text-white w-full  border-b border-gray-300 p-2 bg-transparent  outline-none "
                      id="email"
                      name="email"
                      placeholder="Enter Your Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium text-white"
                      htmlFor="phone_number"
                    >
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input text-white w-full border-b border-gray-300 p-2 bg-transparent  outline-none "
                      id="phone_number"
                      name="phone_number"
                      placeholder="Enter Your Phone Number"
                      required
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="md:col-span-2 col-span-1">
                    <label
                      className="block mb-1 font-medium text-white"
                      htmlFor="comment"
                    >
                      Comment <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      className="form-textarea text-white w-full border-b border-gray-300 p-2 bg-transparent  outline-none "
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
             text-white  text-lg rounded-lg py-2 px-4  shadow-lg
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

            {/* Contact Details Section */}
            {/* <div className="flex justify-center items-center">
            <div className="contact-details  bg-white p-6 shadow-lg rounded-2xl">
              <h2 className="text-3xl font-semibold mb-2">
                Let's get in touch
              </h2>
              <h5 className="text-gray-500 font-light mb-4">
                We're open for any suggestion or just to have a chat
              </h5>

              <div className="contact-box flex items-start mb-4">
                <div className="contact-icon mr-4">📍</div>
                <div className="contact-title">
                  <h4 className="font-semibold">Address :</h4>
                  <p>Dubai, United Arab Emirates</p>
                </div>
              </div>

              <div className="contact-box flex items-start mb-4">
                <div className="contact-icon mr-4">📞</div>
                <div className="contact-title">
                  <h4 className="font-semibold">Phone Number :</h4>
                  <p>+971 50 670 9963</p>
                </div>
              </div>

              <div className="contact-box flex items-start">
                <div className="contact-icon mr-4">✉</div>
                <div className="contact-title">
                  <h4 className="font-semibold">Email Address :</h4>
                  <p>info@rentro.ae</p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
        <div className="map-container mt-10 rounded-t-xl overflow-hidden shadow-lg z-50">
          {/* Google Map Section */}
          <div className="map-container  col-span-1 md:col-span-2 lg:col-span-3 rounded-t-xl overflow-hidden shadow-lg">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80912.26133887904!2d55.227488!3d25.076022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1700012345678!5m2!1sen!2sae"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <BottomNav/>
      <ScrollToTopButton/>
    </>
  );
};

export default ContactUs;