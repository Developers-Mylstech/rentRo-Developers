// import React from 'react';

// export default function CareerDetail() {
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-20">
//       {/* Job Banner */}
//       <div className="rounded-xl overflow-hidden shadow-lg mb-10">
//         <img
//           src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//           alt="Job Banner"
//           className="w-full h-64 object-cover"
//         />
//       </div>

//       {/* Job Description */}
//       <div className="mb-12">
//         <h1 className="text-3xl font-bold mb-4">Senior Software Engineer</h1>
//         <p className="text-gray-700 leading-relaxed text-lg">
//           We are looking for a passionate Senior Software Engineer to join our team. The ideal candidate will be responsible for designing, developing, and implementing software solutions. You should have experience working in a team-oriented environment and be comfortable with modern front-end and back-end technologies. Strong problem-solving skills and the ability to work under deadlines are crucial.
//           <br /><br />
//           Responsibilities include developing scalable web applications, collaborating with cross-functional teams, and continuously improving software performance. If you are excited about technology and ready to make a big impact, we want to hear from you!
//         </p>
//       </div>

//       {/* Application Form */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-semibold mb-6">Apply Now</h2>
//         <form className="space-y-4">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Your name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Contact Number</label>
//               <input
//                 type="tel"
//                 className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Your contact"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Current City</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Your city"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Your email"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF)</label>
//             <input
//               type="file"
//               accept=".pdf"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
//             >
//               Submit Application
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaUpload } from 'react-icons/fa';

export default function CareerDetail() {
  const { state } = useLocation();
  const job = state?.jobData || {
    id: 1,
    title: "Graphic Designer (Urgent Need)",
    description: "We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.",
    longDescription: `
      <p>As a Graphic Designer at our company, you'll be responsible for creating visually stunning designs that communicate our brand message effectively. You'll collaborate with our marketing and product teams to deliver high-quality visual assets.</p>
      
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Create engaging designs for digital and print media</li>
        <li>Develop brand identities and marketing materials</li>
        <li>Work with cross-functional teams to understand design requirements</li>
        <li>Maintain brand consistency across all designs</li>
        <li>Stay updated with industry trends and design tools</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>3+ years of professional design experience</li>
        <li>Expertise in Adobe Creative Suite (Photoshop, Illustrator, InDesign)</li>
        <li>Strong portfolio showcasing design skills</li>
        <li>Excellent communication and teamwork abilities</li>
      </ul>
    `,
    salary: "Not Disclosed",
    location: "Bhopal, India",
    type: "Full-time",
    experience: "2+ years",
    postedDate: "2023-05-15",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  };

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Job Header with Image */}
        <div className="relative h-64 w-full">
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {job.location}
              </span>
              <span className="flex items-center">
                <FaBriefcase className="mr-2" /> {job.type}
              </span>
              <span className="flex items-center">
                <FaMoneyBillWave className="mr-2" /> {job.salary}
              </span>
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" /> Posted: {job.postedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-6">
          <div className="md:col-span-2">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.longDescription }}></div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">How to Apply</h3>
              <p>Please fill out the application form and upload your resume. Our HR team will review your application and contact you if your profile matches our requirements.</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Current City*</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF)*</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="resume"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="resume"
                              name="resume"
                              type="file"
                              required
                              accept=".pdf,.doc,.docx"
                              onChange={handleChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                      </div>
                    </div>
                    {formData.resume && (
                      <p className="mt-2 text-sm text-gray-600 flex items-center">
                        <FaUpload className="mr-2" /> {formData.resume.name}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-medium"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}