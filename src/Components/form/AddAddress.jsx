import React, { useEffect } from "react";
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
const { fetchAddresses ,addresses } = useAddressStore()

useEffect(() => {
    fetchAddresses()
}, [])


const AddAddress = ({ control, errors, register }) => {
    return (
        <div className="space-y-4 p-4">
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