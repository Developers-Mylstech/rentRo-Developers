

import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import useAddressStore from "../Context/AddressContext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const AddressList = () => {
  const navigate = useNavigate();
  const toast = React.useRef(null);
  const {
    fetchAddresses,
    addresses,
    updateAddress,
    deleteAddress,
    addAddress,
  } = useAddressStore();

  const addressTypes = [
    { name: "HOME", code: "HOME" },
    { name: "OFFICE", code: "OFFICE" },
    { name: "OTHER", code: "OTHER" },
  ];

  const countries = [
    { name: "United Arab Emirates", code: "AE" },
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "UK" },
  ];

  const emirates = [
    { name: "Abu Dhabi", code: "AUH" },
    { name: "Dubai", code: "DXB" },
    { name: "Sharjah", code: "SHJ" },
    { name: "Ajman", code: "AJM" },
    { name: "Umm Al Quwain", code: "UAQ" },
    { name: "Ras Al Khaimah", code: "RAK" },
    { name: "Fujairah", code: "FUJ" },
  ];

  const [visibleAddressDialog, setVisibleAddressDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        await fetchAddresses();
        setLoading(false);
      } catch (error) {
        console.error("Failed to load addresses:", error);
        setLoading(false);
        showToast('error', 'Error', 'Failed to load addresses');
      }
    };
    loadAddresses();
  }, [fetchAddresses]);

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
      className: 'm-2'
    });
  };

  const handleSetDefault = async (addressId) => {
    try {
      // First reset all addresses to non-default
      await Promise.all(
        addresses
          .filter(addr => addr.default)
          .map(addr => updateAddress(addr.addressId, { ...addr, default: false })))
      
      // Then set the selected address as default
      const addressToUpdate = addresses.find(addr => addr.addressId === addressId);
      if (addressToUpdate) {
        await updateAddress(addressId, { ...addressToUpdate, default: true });
        showToast('success', 'Success', 'Default address updated');
      }
    } catch (error) {
      console.error("Failed to set default address:", error);
      showToast('error', 'Error', 'Failed to update default address');
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const res = await deleteAddress(addressId);
      
        if(res === 200 || res === 201){
          fetchAddresses();
          showToast('success', 'Success', 'Address deleted successfully');

        }
        else{
          showToast('error', 'Error', 'Failed to delete address');
        }
      } catch (error) {
        console.error("Failed to delete address:", error);
        showToast('error', 'Error', 'Failed to delete address');
      }
    }
  };

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setEditMode(true);
    setValue("streetAddress", address.streetAddress);
    setValue("buildingName", address.buildingName);
    setValue("flatNo", address.flatNo);
    setValue("area", address.area);
    setValue("landmark", address.landmark);
    setValue("default", address.default);
    
    // Set dropdown values
    setValue("emirate", emirates.find(e => e.name === address.emirate));
    setValue("country", countries.find(c => c.name === address.country));
    setValue("addressType", addressTypes.find(at => at.name === address.addressType));
    
    setVisibleAddressDialog(true);
  };

  const handleAddNew = () => {
    reset();
    setEditMode(false);
    setCurrentAddress(null);
    setVisibleAddressDialog(true);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const addressData = {
        streetAddress: data.streetAddress,
        buildingName: data.buildingName,
        flatNo: data.flatNo,
        area: data.area,
        emirate: data.emirate?.name,
        country: data.country?.name,
        landmark: data.landmark,
        addressType: data.addressType?.name,
        default: data.default || false,
      };

      if (editMode && currentAddress) {
        await updateAddress(currentAddress.addressId, addressData);
        await fetchAddresses();
        showToast('success', 'Success', 'Address updated successfully');
      } else {
        await addAddress(addressData);
        showToast('success', 'Success', 'Address added successfully');
      }

      await fetchAddresses();
      setVisibleAddressDialog(false);
      reset();
    } catch (error) {
      console.error("Error saving address:", error);
      showToast('error', 'Error', 'Failed to save address');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (addressType) => {
    switch (addressType?.toLowerCase()) {
      case "home":
        return <FaHome className="text-blue-500" />;
      case "office":
        return <FaBuilding className="text-green-500" />;
      default:
        return <FaMapMarkerAlt className="text-purple-500" />;
    }
  };

  const addressDialogHeader = (
    <div className="flex items-center gap-3">
      <FaMapMarkerAlt className="text-purple-500 text-xl" />
      <span className="text-lg font-semibold">
        {editMode ? "Edit Address" : "Add New Address"}
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toast ref={toast} />
      
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl text-base  font-bold text-gray-800">Your Addresses</h2>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white md:px-4 px-2 py-2 rounded-lg flex items-center gap-1 md:text-base text-sm "
        >
          <FaPlus />
          <span>Add Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FaMapMarkerAlt className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No addresses saved yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't added any addresses to your account.
          </p>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.addressId}
              className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${
                address.default ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIcon(address.addressType)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-800 capitalize">
                        {address.addressType?.toLowerCase() || "address"}
                      </h4>
                      {address.default && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">
                      {address.buildingName && `${address.buildingName}, `}
                      {address.flatNo && `Flat ${address.flatNo}, `}
                      {address.streetAddress && `${address.streetAddress}, `}
                      {address.area && `${address.area}, `}
                      {address.emirate && `${address.emirate}, `}
                      {address.country && address.country}
                    </p>
                    {address.landmark && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Landmark:</span>{" "}
                        {address.landmark}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => handleEdit(address)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(address.addressId)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              {!address.default && (
                <button
                  onClick={() => handleSetDefault(address.addressId)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                >
                  Set as default
                </button>
              )}
            </div>
          ))}
        </div>
      )}

<Dialog
  header={addressDialogHeader}
  visible={visibleAddressDialog}
  onHide={() => {
    setVisibleAddressDialog(false);
    reset();
  }}
  className="w-full max-w-[95vw] md:w-3/4 lg:w-1/2"
  dismissableMask={!isSubmitting}
  style={{ width: '95vw' }} // Force mobile width
>
  <div className="space-y-4 p-2 md:p-4">
    <form
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Street Address - Full width on all screens */}
      <div className="col-span-2">
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address*
        </label>
        <InputText
          id="streetAddress"
          {...register("streetAddress", {
            required: "Street address is required",
          })}
          placeholder="Street Address"
          className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.streetAddress ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.streetAddress && (
          <small className="text-red-600 text-xs">
            {errors.streetAddress.message}
          </small>
        )}
      </div>

      {/* Building Name - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700 mb-1">
          Building Name
        </label>
        <InputText
          id="buildingName"
          {...register("buildingName")}
          placeholder="Building Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Flat/Villa No - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="flatNo" className="block text-sm font-medium text-gray-700 mb-1">
          Flat/Villa No*
        </label>
        <InputText
          id="flatNo"
          {...register("flatNo", {
            required: "Flat/Villa No is required",
          })}
          placeholder="Flat/Villa No"
          className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.flatNo ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.flatNo && (
          <small className="text-red-600 text-xs">
            {errors.flatNo.message}
          </small>
        )}
      </div>

      {/* Area - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
          Area*
        </label>
        <InputText
          id="area"
          {...register("area", { required: "Area is required" })}
          placeholder="Area"
          className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.area ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.area && (
          <small className="text-red-600 text-xs">
            {errors.area.message}
          </small>
        )}
      </div>

      {/* Emirate - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="emirate" className="block text-sm font-medium text-gray-700 mb-1">
          Emirate*
        </label>
        <Controller
          control={control}
          name="emirate"
          rules={{ required: "Emirate is required" }}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={emirates}
              optionLabel="name"
              placeholder="Select Emirate"
              className={`w-full border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.emirate ? "border-red-500" : "border-gray-300"
              }`}
              panelClassName="text-sm" // Smaller text for mobile
            />
          )}
        />
        {errors.emirate && (
          <small className="text-red-600 text-xs">
            {errors.emirate.message}
          </small>
        )}
      </div>

      {/* Country - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country*
        </label>
        <Controller
          control={control}
          name="country"
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={countries}
              optionLabel="name"
              placeholder="Select Country"
              className={`w-full border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
              panelClassName="text-sm" // Smaller text for mobile
            />
          )}
        />
        {errors.country && (
          <small className="text-red-600 text-xs">
            {errors.country.message}
          </small>
        )}
      </div>

      {/* Landmark - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
          Landmark
        </label>
        <InputText
          id="landmark"
          {...register("landmark")}
          placeholder="Landmark (optional)"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Address Type - Full width on mobile, half on desktop */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="addressType" className="block text-sm font-medium text-gray-700 mb-1">
          Address Type*
        </label>
        <Controller
          control={control}
          name="addressType"
          rules={{ required: "Address Type is required" }}
          render={({ field }) => (
            <Dropdown
              {...field}
              options={addressTypes}
              optionLabel="name"
              placeholder="Select Address Type"
              className={`w-full border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.addressType ? "border-red-500" : "border-gray-300"
              }`}
              panelClassName="text-sm" // Smaller text for mobile
            />
          )}
        />
        {errors.addressType && (
          <small className="text-red-600 text-xs">
            {errors.addressType.message}
          </small>
        )}
      </div>

      {/* Default Address Checkbox - Full width */}
      <div className="col-span-2 flex items-center">
        <Controller
          control={control}
          name="default"
          render={({ field }) => (
            <input
              type="checkbox"
              id="default"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          )}
        />
        <label
          htmlFor="default"
          className="ml-2 block text-sm text-gray-700"
        >
          Set as default shipping address
        </label>
      </div>

      {/* Buttons - Full width on mobile, auto width on desktop */}
      <div className="col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
        <Button
          label="Cancel"
          type="button"
          onClick={() => {
            setVisibleAddressDialog(false);
            reset();
          }}
          className="p-button-text w-full sm:w-auto"
          disabled={isSubmitting}
        />
        <Button
          label={editMode ? "Update" : "Save"}
          type="submit"
          loading={isSubmitting}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        />
      </div>
    </form>
  </div>
</Dialog>
    </div>
  );
};

export default AddressList;