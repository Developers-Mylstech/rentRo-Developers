import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useAddressStore } from "../../Context/AddressContext";

const emirates = [
    { name: "Abu Dhabi", code: "AUH" },
    { name: "Dubai", code: "DXB" },
    { name: "Sharjah", code: "SHJ" },
    { name: "Ajman", code: "AJM" },
    { name: "Umm Al Quwain", code: "UAQ" },
    { name: "Ras Al Khaimah", code: "RAK" },
    { name: "Fujairah", code: "FUJ" },
];

const addressTypes = [
    { name: "HOME" },
    { name: "OFFICE" },
    { name: "OTHER" },
];

const countries = [
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "UK" },
    { name: "Canada", code: "CA" },
];

const AddAddress = ({ control, errors, register, setValue }) => {
    const { fetchAddresses, addresses } = useAddressStore();
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    useEffect(() => { 
        fetchAddresses();
    }, []);

    const handleAddressSelect = (address) => {
        setSelectedAddressId(address.addressId);
        setValue("streetAddress", address.streetAddress);
        setValue("buildingName", address.buildingName);
        setValue("flatNo", address.flatNo);
        setValue("area", address.area);
        setValue("emirate", address.emirate);
        setValue("country", address.country);
        setValue("landmark", address.landmark);
        setValue("addressType", address.addressType);
        setValue("default", address.default);
    };

    return (
        <div className="space-y-4 p-4">
            {/* Address Selection Section */}
            {addresses && addresses.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Select from saved addresses</h3>
                    <div className="space-y-2">
                        {addresses.map((address) => (
                            <div 
                                key={address.addressId} 
                                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleAddressSelect(address)}
                            >
                                <input
                                    type="radio"
                                    name="savedAddress"
                                    checked={selectedAddressId === address.addressId}
                                    onChange={() => {}}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700">
                                        {address.formattedAddress}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {address.addressType} {address.default && "(Default)"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Or add new address */}
            {addresses && addresses.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Or add new address</h3>
                </div>
            )}

            {/* Address Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                    </label>
                    <InputText
                        className={classNames("w-full p-3 border rounded-lg", {
                            "border-gray-300": !errors.streetAddress,
                            "border-red-500": errors.streetAddress,
                        })}
                        {...register("streetAddress", {
                            required: "Street address is required",
                        })}
                    />
                    {errors.streetAddress && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.streetAddress.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Building Name
                    </label>
                    <InputText
                        className={classNames("w-full p-3 border rounded-lg", {
                            "border-gray-300": !errors.buildingName,
                            "border-red-500": errors.buildingName,
                        })}
                        {...register("buildingName")}
                    />

                    {errors.buildingName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.buildingName.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Flat/Villa No *
                    </label>
                    <InputText
                        className={classNames("w-full p-3 border rounded-lg", {
                            "border-gray-300": !errors.flatNo,
                            "border-red-500": errors.flatNo,
                        })}
                        {...register("flatNo", {
                            required: "Flat/Villa number is required",
                        })}
                    />
                    {errors.flatNo && (
                        <p className="mt-1 text-sm text-red-600">{errors.flatNo.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area *
                    </label>
                    <InputText
                        className={classNames("w-full p-3 border rounded-lg", {
                            "border-gray-300": !errors.area,
                            "border-red-500": errors.area,
                        })}
                        {...register("area", { required: "Area is required" })}
                    />
                    {errors.area && (
                        <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emirate *
                    </label>
                    <Controller
                        name="emirate"
                        control={control}
                        rules={{ required: "Emirate is required" }}
                        render={({ field }) => (
                            <Dropdown
                                value={emirates.find((item) => item.name === field.value) || null}
                                options={emirates}
                                optionLabel="name"
                                placeholder="Select Emirate"
                                className={classNames("w-full border rounded-lg", {
                                    "border-gray-300": !errors.emirate,
                                    "border-red-500": errors.emirate,
                                })}
                                onChange={(e) => field.onChange(e.value.name)}
                            />
                        )}
                    />
                    {errors.emirate && (
                        <p className="mt-1 text-sm text-red-600">{errors.emirate.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                    </label>
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                            <Dropdown
                                value={countries.find((c) => c.name === field.value) || null}
                                options={countries}
                                optionLabel="name"
                                placeholder="Select Country"
                                className={classNames("w-full border rounded-lg", {
                                    "border-gray-300": !errors.country,
                                    "border-red-500": errors.country,
                                })}
                                onChange={(e) => field.onChange(e.value.name)}
                            />
                        )}
                    />

                    {errors.country && (
                        <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Landmark (optional)
                    </label>
                    <InputText
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        {...register("landmark")}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Type *
                    </label>
                    <Controller
                        name="addressType"
                        control={control}
                        rules={{ required: "Address type is required" }}
                        render={({ field }) => (
                            <Dropdown
                                value={
                                    addressTypes.find((type) => type.name === field.value) || null
                                }
                                options={addressTypes}
                                optionLabel="name"
                                placeholder="Select Address Type"
                                className={classNames("w-full border rounded-lg", {
                                    "border-gray-300": !errors.addressType,
                                    "border-red-500": errors.addressType,
                                })}
                                onChange={(e) => field.onChange(e.value.name)}
                            />
                        )}
                    />

                    {errors.addressType && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.addressType.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center mt-2">
                <input
                    type="checkbox"
                    id="defaultAddress"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    {...register("default")}
                />
                <label
                    htmlFor="defaultAddress"
                    className="ml-2 block text-sm text-gray-700"
                >
                    Set as default address
                </label>
            </div>
        </div>
    );
};

export default AddAddress;