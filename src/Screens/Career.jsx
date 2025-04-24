import React, { useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useJobStore from '../Context/JobContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Career() {
  const navigate = useNavigate();
  const { fetchJobs, jobs, loading , getJobById } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderSkeleton = () => (
    Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6">
        <Skeleton height={24} width="60%" className="mb-4" />
        <Skeleton count={4} />
        <div className="mt-4 flex justify-end">
          <Skeleton width={100} height={36} />
        </div>
      </div>
    ))
  );

  return (
    <section className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Growing Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore exciting career opportunities and help us build the future.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {loading ? renderSkeleton() : jobs?.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
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
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-700">
                          <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                          <span>{job.location || "Dubai"}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <FaMoneyBillWave className="mr-2 text-gray-500 flex-shrink-0" />
                          <span>{job.salary || "Not Disclosed"}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <FaUsers className="mr-2 text-gray-500 flex-shrink-0" />
                          <span>{job.openings} opening{job.openings > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2 text-gray-500 font-medium">Exp:</span>
                          <span>{job.experience || "2+ year"}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{job.jobDescription}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate(`/career/${job?.jobPostId}`)}
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
