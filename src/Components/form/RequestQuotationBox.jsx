import { useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const RequestQuotationBox = ({ setOpenDailog }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        companyName: '',
        location: '',
        productImages: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
        setPreview('');
        setFormData(prev => ({ ...prev, productImages: [] }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = '';
            if (selectedImage) {
                setUploading(true)
                const imageFormData = new FormData();
                imageFormData.append('file', selectedImage);

                const uploadResponse = await axiosInstance.post('/product-images/upload', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = uploadResponse?.data?.fileUrl;
            }
            setUploading(false)


            const payload = {
                name: formData.name,
                mobile: formData.mobile,
                companyName: formData.companyName || null,
                location: formData.location,
                productImages: [imageUrl] || []
            };

            await axiosInstance.post('/request-quotations', payload);

            setFormData({
                name: '',
                mobile: '',
                companyName: '',
                location: '',
                productImages: []
            });
            removeImage();
            setOpenDailog(false);
            alert('Quotation request submitted successfully!');
        } catch (error) {
            console.error('Error submitting quotation request:', error);
            alert('Failed to submit quotation request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Request Quotation</h2>
                    <button
                        onClick={() => setOpenDailog(false)}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Upload Area */}
                            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                                <FaCloudUploadAlt className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600 text-center">
                                    {selectedImage ? selectedImage.name : 'Select image or drag and drop'}
                                </span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    capture
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>


                            {preview && (
                                <div className="relative group h-full max-h-[150px]">
                                    <div className="relative h-full rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className={`max-h-full max-w-full object-contain ${uploading ? 'opacity-60' : 'opacity-100'}`}
                                        />
                                        {uploading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                                                <FaSpinner className="text-white text-2xl animate-spin" />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100"
                                            aria-label="Remove image"
                                        >
                                            <RxCross2 className="text-gray-600 text-lg" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile *</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name (if)</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter company name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter location"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestQuotationBox;