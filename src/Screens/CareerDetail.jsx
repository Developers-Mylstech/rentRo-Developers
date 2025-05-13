import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaUpload, FaCheckCircle } from 'react-icons/fa';
import useJobStore from '../Context/JobContext';
import { ImSpinner } from "react-icons/im";
import { Dialog } from 'primereact/dialog';
export default function CareerDetail() {
  const { state } = useLocation();
  const { id } = useParams(); // Get the id from URL params
  const { loading, getJobById, jobById, updatePdf, pdfPath, ApplicantJobPost } = useJobStore();
  const [uploading, setUploading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (id) {
      console.log(id, 'sd')
      getJobById(id);
    }
  }, [id]);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    jobPostId: +id,
    resume: pdfPath || null
  });

  const handlepdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const uploadedPath = await updatePdf(fd);
      if (uploadedPath) {
        setFormData(prev => ({
          ...prev,
          resume: uploadedPath
        }));
      }
    } catch (err) {
      console.error("PDF upload failed:", err);
      alert("Failed to upload PDF. Please try again.");
    } finally {
      setUploading(false);
    }
  };



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true)
    try {
      const res = await ApplicantJobPost(formData)

      if (res) {
        setShowDialog(true)
        setPostLoading(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          jobPostId: +id,
          resume: pdfPath || null
        })
      }

      setTimeout(() => {
        setShowDialog(false)
      }, 5000)
    } catch {
      alert('Failed to submit application. Please try again.')
    }

  };

  return (
    <>
      {!loading ? (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-xl  overflow-hidden">

          <div className="relative h-64 w-full">
            <img
              src={jobById?.imageDetails?.imageUrl}
              alt={jobById?.jobTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{jobById?.jobTitle}</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> {jobById?.location}
                </span>
                <span className="flex items-center">
                  <FaBriefcase className="mr-2" /> {jobById?.type}
                </span>
                <span className="flex items-center">
                  <FaMoneyBillWave className="mr-2" /> {jobById?.salary}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" /> Posted: {jobById?.postedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8  my-5">
            <div className="  md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{jobById?.jobDescription}</p>
              </div>

              {/* Key Responsibilities Section */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCheckCircle className="text-blue-600 mr-2" />
                  Key Responsibilities
                </h3>
                <ul className="space-y-3">

                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCheckCircle className="text-gray-600 mr-2" />
                  Requirements
                </h3>
                <p> {jobById?.requirements}</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">How to Apply</h3>
                <p className="text-gray-700">Please fill out the application form and upload your resume. Our HR team will review your application and contact you if your profile matches our requirements.</p>
              </div>
            </div>

            {/* Application Form */}
            <div className="md:col-span-1">
              <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">Apply Now</h2>
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
                      {formData.resume ? (<p className="mt-2 bg-blue-50 border p-4 text-center rounded-lg justify-center text-sm text-gray-600 flex items-center">
                        <FaUpload className="mr-2" /> Resume
                      </p>) : (<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <div className="flex justify-center text-sm text-gray-600">
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
                                onChange={handlepdf}
                                className="sr-only"
                              />
                            </label>

                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                        </div>
                      </div>)}

                    </div>

                    {postLoading ? (<div className='flex justify-center items-center'> <ImSpinner className='text-blue-500 animate-spin text-xl' /></div>) : (<button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 font-medium shadow-md"
                    >
                      Submit Application
                    </button>)}

                  </div>
                </form>
              </div>
            </div>
          </div>
          <Dialog header="Application Status" className='bg-green-100' visible={showDialog} onHide={() => setShowDialog(false)}>
            <div className='bg-green-50 p-5 rounded-lg'>
              <p className='text-green-700 font-bold'>Application submitted successfully!</p>
            </div>
          </Dialog>
        </div>
      </div>) : (<>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="relative h-64 w-full bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
              <div className="flex flex-wrap gap-4 mt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-6">

            <div className="md:col-span-2 space-y-8">
              <div>
                <div className="h-7 w-1/4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
                  ))}
                </div>
              </div>

              {/* Key Responsibilities Skeleton */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                <ul className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-4 w-4 bg-gray-300 rounded-full mr-2 mt-1"></div>
                      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements Skeleton */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
                  ))}
                </div>
              </div>

              {/* How to Apply Skeleton */}
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Form Skeleton */}
            <div className="md:col-span-1">
              <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-6 shadow-sm">
                <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-1"></div>
                      <div className="h-10 bg-gray-100 rounded-md"></div>
                    </div>
                  ))}
                  <div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-1"></div>
                    <div className="h-24 bg-gray-100 rounded-md border-2 border-dashed border-gray-300"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div></>)}

    </>
  );
}