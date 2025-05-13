// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import axiosInstance from "../../utils/axiosInstance";
// import { FaCloudUploadAlt, FaSpinner, FaCheck, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { Dialog } from "primereact/dialog";


// const RequestQuotationBox = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(false); // 'success' or 'error'
//   const [statusMessage, setStatusMessage] = useState("");
//   const fileInputRef = useRef(null);
// const [openDailog, setOpenDailog] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     setValue,
//   } = useForm({
//     defaultValues: {
//       name: "",
//       mobile: "",
//       companyName: "",
//       location: "",
//       productImages: [],
//     },
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setSelectedImage(null);
//     setPreview("");
//     setValue("productImages", []);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = "";
//       if (selectedImage) {
//         setUploading(true);
//         const imageFormData = new FormData();
//         imageFormData.append("file", selectedImage);
  
//         const accessToken = localStorage.getItem("access");
//         if (accessToken) {
//           axiosInstance.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${accessToken}`;
//         }
  
//         const uploadResponse = await axiosInstance.post(
//           "/images/upload",
//           imageFormData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
  
//         if (uploadResponse?.data?.fileUrl) {
//           imageUrl = uploadResponse.data.fileUrl;
//         }
//         setUploading(false);
//       }
  

//       const payload = {
//         name: data.name,
//         mobile: data.mobile,
//         companyName: data.companyName,
//         // location: {
//         //   street: data.location.street,
//         //   area: data.location.area,
//         //   building: data.location.building,
//         //   villaNo: data.location.villaNo,
//         //   country: data.location.country,
//         //   gmapLink: data.location.gmapLink
//         // },
//         location: data.location.street,

//         productImages: imageUrl ? [imageUrl] : [],
//       };
  
//       const accessToken = localStorage.getItem("access");
//       if (accessToken) {
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${accessToken}`;
//       }
  
//       const response = await axiosInstance.post("/request-quotations", payload);
      
//       setSubmitStatus(true);
//       setStatusMessage("Quotation request submitted successfully!");
  
//       setTimeout(() => {
//         reset();
//         removeImage();
//         setOpenDailog(false);
//       }, 4000);
      
//     } catch (error) {
//       setOpenDailog(true);
//       console.error("Error:", error);
//       setSubmitStatus(false);
//       setStatusMessage("Failed to submit quotation request. Please try again.");
  
//       setTimeout(() => {
//        setOpenDailog(false);
//       }, 3500); // Fixed typo (350000 was too long)
//     }
//   };

//   return (
//     <div className="  bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white w-full relative overflow-y-auto">


//         <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>

//           <div className="space-y-2">
//             {!selectedImage && (
//               <label
//                 className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer
//                   border-gray-300 hover:border-blue-500 hover:bg-blue-50
//                   transition-all duration-300 ease-in-out h-[150px]`}
//               >
//                 <FaCloudUploadAlt className="w-8 h-8 text-gray-400 mb-2" />
//                 <span className="text-sm text-gray-600 text-center">
//                   Select Product Image
//                 </span>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   capture
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//             )}

//             {preview && (
//               <div className="space-y-2">
//                 <div className="relative group h-[150px]">
//                   <div className="relative h-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className={`max-h-full max-w-full object-contain ${uploading ? "opacity-60" : "opacity-100"
//                         }`}
//                     />
//                     {uploading && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
//                         <FaSpinner className="text-white text-2xl animate-spin" />
//                       </div>
//                     )}
//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100"
//                       aria-label="Remove image"
//                     >
//                       <RxCross2 className="text-gray-600 text-lg" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-sm font-medium text-gray-700 truncate">
//                     {selectedImage.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {(selectedImage.size / 1024).toFixed(2)} KB
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
//               <input
//                 {...register("name", { required: "Name is required" })}
//                 className={`mt-1 block w-full p-2 border-0 border-b border-gray-300 
//         focus:border-b focus:border-blue-500 focus:ring-0
//         ${errors.name ? "border-red-500" : ""}`}
//                 placeholder="Enter your name"
//               />
//               {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
//             </div>

//             {/* Mobile */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mobile*</label>
//               <input
//                 {...register("mobile", {
//                   required: "Mobile is required",
//                   pattern: {
//                     value: /^[0-9]{10,15}$/,
//                     message: "Invalid mobile number",
//                   },
//                 })}
//                 className={`mt-1 block w-full p-2 border-0 border-b border-gray-300 
//         focus:border-b focus:border-blue-500 focus:ring-0
//         ${errors.mobile ? "border-red-500" : ""}`}
//                 placeholder="Enter your mobile number"
//               />
//               {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>}
//             </div>

//             {/* Company Name */}
//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (optional)</label>
//               <input
//                 {...register("companyName")}
//                 className="mt-1 block w-full p-2 border-0 border-b border-gray-300 
//         focus:border-b focus:border-blue-500 focus:ring-0"
//                 placeholder="Enter company name"
//               />
//             </div>

//             {/* Location Details Heading */}
//             <div className="sm:col-span-2">
//               <h3 className="text-sm font-medium text-gray-700 flex items-center">
//                 <FaMapMarkerAlt className="mr-2 text-blue-500" />
//                 Location Details
//               </h3>
//             </div>

//             {/* Street Address */}
//             <div className="sm:col-span-2">
//               <label className="block text-xs font-medium text-gray-500 mb-1">Street Address*</label>
//               <input
//                 {...register("location.street", { required: "Street address is required" })}
//                 className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.location?.street ? "border-red-500" : ""}`}
//                 placeholder="Street name and number"
//               />
//               {errors.location?.street && <p className="mt-1 text-xs text-red-600">{errors.location.street.message}</p>}
//             </div>

//             {/* Area/District */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Area/District*</label>
//               <input
//                 {...register("location.area", { required: "Area is required" })}
//                 className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.location?.area ? "border-red-500" : ""}`}
//                 placeholder="Area or district"
//               />
//               {errors.location?.area && <p className="mt-1 text-xs text-red-600">{errors.location.area.message}</p>}
//             </div>

//             {/* Building Name */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Building Name</label>
//               <input
//                 {...register("location.building")}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 placeholder="Building name (if applicable)"
//               />
//             </div>

//             {/* Villa/House No. */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Villa/House No.</label>
//               <input
//                 {...register("location.villaNo")}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 placeholder="Villa or house number"
//               />
//             </div>

//             {/* Country */}
//             <div>
//               <label className="block text-xs font-medium text-gray-500 mb-1">Country*</label>
//               <select
//                 {...register("location.country", { required: "Country is required" })}
//                 className={`w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.location?.country ? "border-red-500" : ""}`}
//               >
//                 <option value="">Select Country</option>
//                 <option value="UAE">United Arab Emirates</option>
//                 <option value="SA">Saudi Arabia</option>
//                 <option value="QA">Qatar</option>
//                 <option value="KW">Kuwait</option>
//                 <option value="OM">Oman</option>
//                 <option value="BH">Bahrain</option>
//               </select>
//               {errors.location?.country && <p className="mt-1 text-xs text-red-600">{errors.location.country.message}</p>}
//             </div>

//             {/* Google Maps Link */}
//             <div className="sm:col-span-2">
//               <label className="block text-xs font-medium text-gray-500 mb-1">Google Maps Link</label>
//               <div className="flex rounded-md shadow-sm">
//                 <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                   maps.google.com
//                 </span>
//                 <input
//                   {...register("location.gmapLink")}
//                   className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   placeholder="Paste Google Maps link"
//                   type="url"
//                 />
//               </div>
//               <p className="mt-1 text-xs text-gray-500">
//                 Help us locate you faster by sharing your location link
//               </p>
//             </div>
//           </div>


//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 flex items-center justify-center"
//           >
//             {isSubmitting ? (
//               <>
//                 <FaSpinner className="animate-spin mr-2" />
//                 Submitting...
//               </>
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </form>


//         <Dialog header={`${submitStatus ? "Success" : "Error"}`} className="w-1/2" visible={openDailog} onHide={() => setOpenDailog(false)}>
//           <p className={`${submitStatus ? "text-green-600" : "text-red-600"}`}>{statusMessage}</p>
//         </Dialog>

//       </div>
//     </div>
//   );
// };

// export default RequestQuotationBox;




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
  FaWhatsapp
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";


const RequestQuotationBox = () => {
  // State management
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [quoteRequestId, setQuoteRequestId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const fileInputRef = useRef(null);
 

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
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

  // Image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        setStatusMessage("Please upload an image file");
        setSubmitStatus('error');
        setOpenDialog(true);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setStatusMessage("Image size should be less than 5MB");
        setSubmitStatus('error');
        setOpenDialog(true);
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
    setDialogLoading(true);
    setOpenDialog(true);
    
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
        // location: data.location.street,
        productImages: imageUrl ? [imageUrl] : [],
      };
  
      // Set auth header
    
  
      // Submit quotation request
      const response = await axiosInstance.post("/request-quotations", payload);
      
      // Handle success
      setQuoteRequestId(response.data.id || `QR-${Date.now().toString().slice(-8)}`);
      setSubmitStatus('success');
      setStatusMessage("Thank you for your query!");
      
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
    } finally {
      setDialogLoading(false);
    }
  };

  // Dialog components
  const renderDialogContent = () => {
    if (dialogLoading) {
      return (
        <div className="text-center p-6">
          <ProgressSpinner 
            style={{ width: '50px', height: '50px' }} 
            strokeWidth="4" 
            animationDuration=".5s"
          />
          <p className="mt-4 text-gray-600">Processing your request...</p>
        </div>
      );
    }

    if (submitStatus === 'success') {
      return (
        <div className="text-center p-4">
          <FaCheck className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">{statusMessage}</h3>
          
          <p className="text-gray-600 mb-4">
            Our team will get back to you within 24 hours.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <a 
              href="tel:+971506709963" 
              className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
            >
              <FaPhone /> Call Us
            </a>
            <a 
              href="https://wa.me/971506709963" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      );
    }

    if (submitStatus === 'error') {
      return (
        <div className="text-center p-4">
          <FaTimes className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">{statusMessage}</h3>
          <div className="bg-red-50 rounded-lg p-4 mb-4">
            <p className="text-red-600 flex items-center gap-2">
              <FaInfoCircle /> Please check your information and try again
            </p>
          </div>
          <button
            onClick={() => setOpenDialog(false)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return null;
  };

  const dialogFooter = (
    <div className="flex justify-end">
      {submitStatus === 'success' && (
        <button
          onClick={() => setOpenDialog(false)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          Done
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto my-8">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Request a Quotation</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload Section */}
     
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image {!selectedImage && '(optional)'}
            </label>
            
            {!selectedImage ? (
              <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition h-40">
                <FaCloudUploadAlt className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload product image</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-2">
                <div className="relative group h-40">
                  <div className="relative h-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className={`max-h-full max-w-full object-contain ${uploading ? "opacity-60" : "opacity-100"}`}
                    />
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                        <FaSpinner className="text-white text-2xl animate-spin" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                      aria-label="Remove image"
                    >
                      <RxCross2 className="text-gray-600 text-lg" />
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {selectedImage.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedImage.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}
          </div>


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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link (optional)</label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    maps.google.com
                  </span>
                  <input
                    // {...register("location.gmapLink")}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition disabled:bg-blue-400 flex items-center justify-center"
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
        </form>
      </div>

      {/* Dialog Component */}
      <Dialog
        header={submitStatus === 'success' ? "Request Submitted" : ""}
        visible={openDialog}
        style={{ width: 'min(90vw, 500px)' }}
        onHide={() => setOpenDialog(false)}
        footer={dialogFooter}
        dismissableMask={!dialogLoading}
      >
        {renderDialogContent()}
      </Dialog>
    </div>
  );
};

export default RequestQuotationBox;