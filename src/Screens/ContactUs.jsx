import OceanScene from "../Components/OceanScene";

const ContactCard = () => {
  return (

    <>
    <OceanScene/> 
    <div className="flex flex-col md:flex-row items-stretch justify-center p-10 bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-200 min-h-screen gap-6">
      {/* Contact Form Section */}
      <div className="bg-white  border border-white-900 p-8 rounded-lg shadow-lg w-full md:w-2/3 flex-grow transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">Contact Us</h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Your email address will not be published. Required fields are marked *
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Enter Your First Name"
              className="p-4 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <input
              type="text"
              placeholder="Enter Your Last Name"
              className="p-4 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="p-4 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
              className="p-4 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          <textarea
            placeholder="Comment"
            className="p-4 border-2 border-gray-300 rounded-xl w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg w-full md:w-2/3 hover:bg-gradient-to-l transition-all transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
      
      {/* Contact Information Section */}
      <div className="bg-gradient-to-r from-indigo-100 via-purple-200 to-indigo-200 p-8 rounded-lg shadow-lg w-full md:w-1/3 flex flex-col justify-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Let's Get In Touch</h3>
        <p className="text-gray-600 text-sm mb-6 text-center">
          We're open for any suggestion or just to have a chat.
        </p>
        <div className="space-y-6">
          <p className="flex items-center justify-center text-lg text-gray-700">
            📍 <span className="ml-2 text-indigo-700">Dubai, United Arab Emirates</span>
          </p>
          <p className="flex items-center justify-center text-lg text-gray-700">
            📞 <span className="ml-2 text-indigo-700">+971 50 670 9963</span>
          </p>
          <p className="flex items-center justify-center text-lg text-gray-700">
            ✉️ <span className="ml-2 text-indigo-700">info@rentro.ae</span>
          </p>
        </div>
      </div>

      
    </div>
    </>
   
  );
};

export default ContactCard;
