
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { 
  FaCloudUploadAlt, 
  FaSpinner, 
  FaCheck, 
  FaTimes, 
  FaMapMarkerAlt,
  FaInfoCircle,
  FaPhone,
  FaWhatsapp,
  FaClipboard
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { ProgressSpinner } from "primereact/progressspinner";

const RQProduct = ({ product }) => {
  // State management
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [requestId, setRequestId] = useState("");
  const [showForm, setShowForm] = useState(true);
  const fileInputRef = useRef(null);

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      companyName: "",
      location: {
        street: "",
        area: "",
        building: "",
        villaNo: "",
        country: "",
        gmapLink: ""
      },
      productImages: [],
    },
  });

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(requestId);
    setStatusMessage("Request ID copied to clipboard!");
    setTimeout(() => setStatusMessage("Thank you for your query!"), 2000);
  };

  // Image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setStatusMessage("Please upload an image file");
        setSubmitStatus('error');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage("Image size should be less than 5MB");
        setSubmitStatus('error');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview("");
    setValue("productImages", []);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    try {
      // Image upload
      let imageUrl = "";
      if (selectedImage) {
        setUploading(true);
        const imageFormData = new FormData();
        imageFormData.append("file", selectedImage);

        const accessToken = localStorage.getItem("access");
        if (accessToken) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }

        const uploadResponse = await axiosInstance.post(
          "/images/upload",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse?.data?.fileUrl) {
          imageUrl = uploadResponse.data.fileUrl;
        }
        setUploading(false);
      }

      // Prepare payload
      const payload = {
        name: data.name,
        mobile: data.mobile,
        companyName: data.companyName,
        location: {
          street: data.location.street,
          area: data.location.area,
          building: data.location.building,
          villaNo: data.location.villaNo,
          country: data.location.country,
          gmapLink: data.location.gmapLink
        },
        image: {
          imageId: product?.images[0]?.imageId, 
        } 
      };

      // Submit quotation request
      const response = await axiosInstance.post("/request-quotations", payload);
      setRequestId(response.data.requestQuotationCode);
      
      // Handle success
      setSubmitStatus('success');
      setStatusMessage("Thank you for your query!");
      setShowForm(false);
      
      // Reset form
      reset();
      removeImage();
      
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus('error');
      setStatusMessage(
        error.response?.data?.message || 
        "Failed to submit quotation request. Please try again."
      );
    }
  };

  // Success screen component
  const SuccessScreen = () => (
    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
      <FaCheck className="text-green-500 text-5xl mx-auto mb-4" />
      <h3 className="md:text-xl text-lg font-bold text-gray-800 mb-2">{statusMessage}</h3>
      
      <p className="text-gray-600 mb-4 md:text-base tex-sm">
        Our team will get back to you within 24 hours.
      </p>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <p className="text-sm text-gray-600 mb-1">Your Request ID:</p>
        <div 
          className="flex items-center justify-center gap-2 bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition"
          onClick={copyToClipboard}
        >
          <span className="font-bold text-blue-600 md:text-lg text-sm">{requestId}</span>
          <FaClipboard className="text-blue-400" />
        </div>
        <p className="text-xs text-gray-500 mt-2">Click to copy</p>
      </div>
      
      <div className="flex justify-center gap-4 mt-6">
        <a 
          href="tel:+971506709963" 
          className="flex items-center gap-2 bg-blue-100 text-blue-600 md:px-4 px-2 md:text-base text-xs py-2 rounded-lg hover:bg-blue-200 transition"
        >
          <FaPhone /> Call Us
        </a>
        <a 
          href="https://wa.me/971506709963" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-100 text-green-600 md:px-4 px-2 md:text-base text-xs py-2 rounded-lg hover:bg-green-200 transition"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>
    </div>
  );

  // Error display component
  const ErrorDisplay = () => (
    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
      <FaTimes className="text-red-500 text-3xl mx-auto mb-2" />
      <h3 className="text-lg font-bold text-gray-800 mb-2">{statusMessage}</h3>
      <p className="text-red-600 flex items-center justify-center gap-2">
        <FaInfoCircle /> Please check your information and try again
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto my-2">
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {showForm ? "Request a Quotation" : "Request Submitted"}
        </h2>
        
        {submitStatus === 'error' && <ErrorDisplay />}
        
        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                <input
                  {...register("mobile", {
                    required: "Mobile is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.mobile ? "border-red-500" : ""}`}
                  placeholder="501234567"
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (optional)</label>
                <input
                  {...register("companyName")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Location Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address*</label>
                  <input
                    {...register("location.street", { required: "Street address is required" })}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.location?.street ? "border-red-500" : ""}`}
                    placeholder="Street name and building"
                  />
                  {errors.location?.street && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.street.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area/District*</label>
                  <input
                    {...register("location.area", { required: "Area is required" })}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.location?.area ? "border-red-500" : ""}`}
                    placeholder="Area or district"
                  />
                  {errors.location?.area && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.area.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
                  <input
                    {...register("location.building")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Building name (if applicable)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Villa/House No.</label>
                  <input
                    {...register("location.villaNo")}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Villa or house number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                  <select
                    {...register("location.country", { required: "Country is required" })}
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.location?.country ? "border-red-500" : ""}`}
                  >
                    <option value="">Select Country</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="QA">Qatar</option>
                    <option value="KW">Kuwait</option>
                    <option value="OM">Oman</option>
                    <option value="BH">Bahrain</option>
                  </select>
                  {errors.location?.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.location.country.message}</p>
                  )}
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link (optional)</label>
                  <div className="flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      maps.google.com
                    </span>
                    <input
                      {...register("location.gmapLink")}
                      className="flex-1 min-w-0 block w-full px-3 py-3 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Paste Google Maps link"
                      type="url"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Help us locate you faster by sharing your location link
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
           <div className="w-full flex items-center justify-center">
             <button
              type="submit"
              disabled={isSubmitting}
              className="  bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition disabled:bg-blue-400 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Submitting Request...
                </>
              ) : (
                "Request Quotation"
              )}
            </button>
           </div>
          </form>
        ) : (
          <SuccessScreen />
        )}
      </div>
    </div>
  );
};

export default RQProduct;