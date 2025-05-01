import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const jobs = [
  {
    id: 1,
    title: "Graphic Designer (Urgent Need)",
    description: "We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.",
    salary: "Not Disclosed",
    location: "Bhopal, India",
    openings: 1,
    type: "Full-time",
    experience: "2+ years",
    icon: <FaBriefcase className="text-blue-500" />
  },
  {
    id: 2,
    title: "Backend Engineer",
    description: "Design and implement scalable APIs and microservices using Node.js and Python for our growing platform.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.",
    salary: "Not Disclosed",
    location: "Remote",
    openings: 2,
    type: "Full-time",
    experience: "3+ years",
    icon: <FaBriefcase className="text-green-500" />
  },
  {
    id: 3,
    title: "UX Designer",
    description: "Create intuitive user experiences and interfaces. Portfolio demonstrating user-centered design required.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.",
    salary: "Not Disclosed",
    location: "Remote",
    openings: 1,
    type: "Contract",
    experience: "4+ years",
    icon: <FaBriefcase className="text-purple-500" />
  },
  {
    id: 4,
    title: "DevOps Specialist",
    description: "Implement CI/CD pipelines and manage cloud infrastructure on AWS with Kubernetes and Terraform.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.",
    salary: "$110,000 - $150,000",
    location: "Chicago, IL (On-site)",
    openings: 2,
    type: "Full-time",
    experience: "5+ years",
    icon: <FaBriefcase className="text-red-500" />
  },
  {
    id: 5,
    title: "Data Scientist",
    description: "Build machine learning models and derive insights from complex datasets to drive business decisions.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.We're looking for a creative Graphic Designer with strong visual design skills and experience in Adobe Creative Suite.",
    salary: "Not Disclosed",
    location: "Hybrid (Boston, MA)",
    openings: 1,
    type: "Full-time",
    experience: "3+ years",
    icon: <FaBriefcase className="text-yellow-500" />
  },
];

function Career() {
  const navigate = useNavigate();
  const [data, setData] = useState()

  const fetch = async () => {
    try {
      const res = await axiosInstance.get('/job-posts')
      setData(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <section className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Growing Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore exciting career opportunities and help us build the future.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
        {data?.map((job) => (
          <div key={job.jobPostId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50 text-blue-600 text-xl">
                    <FaBriefcase className="text-blue-500" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.jobTitle}</h2>
                      <div className="mt-4  grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-700">
                          <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                          <span>Dubai</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <FaMoneyBillWave className="mr-2 text-gray-500 flex-shrink-0" />
                          <span>Not Disclosed</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <FaUsers className="mr-2 text-gray-500 flex-shrink-0" />
                          <span>3 opening{job.openings > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2 text-gray-500 font-medium">Exp:</span>
                          <span>2+ year</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{job.jobDescription}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate(`/career/${job?.jobTitle}`,)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Apply Now
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Don't see your perfect role?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals. Send us your resume and we'll contact you when a matching position opens up.
        </p>
        <button
          onClick={() => navigate('/career/general-application')}
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300"
        >
          Submit General Application
        </button>
      </div>
    </section>
  );
}

export default Career;