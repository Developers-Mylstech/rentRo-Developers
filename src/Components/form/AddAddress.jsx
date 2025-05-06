import React, { useEffect, useState } from 'react';
import { useAddressStore } from '../../Context/AddressContext';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { Skeleton } from 'primereact/skeleton';

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
    { name: "HOME", code: "HOME" },
    { name: "OFFICE", code: "OFFICE" },
    { name: "OTHER", code: "OTHER" },
];

const countries = [
    { name: "United Arab Emirates", code: "AE" },
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "UK" },
];


export default function AddAddress({ setSelectedAddress, selectedAddress }) {
    const { fetchAddresses, addresses, addAddress } = useAddressStore();

    const [openDialog, setOpenDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            streetAddress: '',
            buildingName: '',
            flatNo: '',
            area: '',
            emirate: null,
            country: null,
            landmark: '',
            addressType: null,
            default: false,
        }
    });

    useEffect(() => {
        const loadAddresses = async () => {
            setLoading(true);
            await fetchAddresses();
            setLoading(false);
        };

        loadAddresses();
    }, []);


    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const addressToSave = {
                ...data,
                emirate: data?.emirate?.name,
                country: data?.country?.name,
                addressType: data?.addressType?.name
            };
            await addAddress(addressToSave);
            await fetchAddresses();
            setOpenDialog(false);
            reset();
        } catch (error) {
            console.error("Error saving address:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const dialogFooter = (
        <div className='flex justify-end gap-5'>
            <Button label="Cancel" onClick={() => { setOpenDialog(false); reset(); }} />
            <Button label="Save" type="submit" onClick={handleSubmit(onSubmit)} loading={isSubmitting} />
        </div>
    );

    return (
        <>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    {/* <h4 className="text-xl font-semibold">Select Address</h4> */}
                    <Button
                        label="Add New Address"
                        icon="pi pi-plus"
                        type="button"
                        onClick={() => setOpenDialog(true)}
                        className="flex items-center justify-center gap-2 border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out w-full sm:w-auto"
                    />
                </div>



                {!loading ? (
                    addresses?.map((address) => (
                        <label
                            key={address.addressId}
                            className={`flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-colors duration-200 ${selectedAddress === address.addressId
                                ? 'border-blue-500 bg-blue-50 shadow-sm'
                                : 'border-gray-300 bg-white'
                                }`}
                        >
                            <input
                                type="radio"
                                name="address"
                                value={address.addressId}
                                checked={selectedAddress === address.addressId}
                                onChange={() => setSelectedAddress(address.addressId)}
                                className="mt-1 accent-blue-500"
                            />
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-800">{address.formattedAddress}</p>
                                <p className="text-xs font-medium text-gray-600 mt-1">
                                    {address.addressType}
                                    {address.default && (
                                        <span className="text-green-600 font-semibold ml-4">(Default)</span>
                                    )}
                                </p>
                            </div>
                        </label>
                    ))
                ) : (

                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 border rounded-md">
                                <Skeleton shape="circle" size="1.25rem" className="mt-1" />
                                <div className="w-full">
                                    <Skeleton width="80%" height="1rem" className="mb-2" />
                                    <Skeleton width="60%" height="0.75rem" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <Dialog
                header="Add New Address"
                visible={openDialog}

                footer={dialogFooter}
                onHide={() => { setOpenDialog(false); reset(); }}

                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            >
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Street Address */}
                    <div className="col-span-1">
                        <InputText
                            id="streetAddress"
                            {...register("streetAddress", { required: "Street address is required" })}
                            placeholder="Street Address"
                            className={`w-full border p-3 rounded-md ${errors.streetAddress ? 'p-invalid' : ''}`}
                        />
                        {errors.streetAddress && <small className="p-error text-red-600">{errors.streetAddress.message}</small>}
                    </div>

                    {/* Building Name */}
                    <div className="col-span-1">
                        <InputText
                            id="buildingName"
                            {...register("buildingName")}
                            placeholder="Building Name"
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* Flat/Villa No */}
                    <div className="col-span-1">
                        <InputText
                            id="flatNo"
                            {...register("flatNo", { required: "Flat/Villa No is required" })}
                            placeholder="Flat/Villa No"
                            className={`w-full border p-3 rounded-md ${errors.flatNo ? 'p-invalid' : ''}`}
                        />
                        {errors.flatNo && <small className="p-error text-red-600">{errors.flatNo.message}</small>}
                    </div>

                    {/* Area */}
                    <div className="col-span-1">
                        <InputText
                            id="area"
                            {...register("area", { required: "Area is required" })}
                            placeholder="Area"
                            className={`w-full border p-3 rounded-md ${errors.area ? 'p-invalid' : ''}`}
                        />
                        {errors.area && <small className="p-error text-red-600">{errors.area.message}</small>}
                    </div>

                    {/* Emirate */}
                    <div className="col-span-1">
                        <Controller
                            control={control}
                            name="emirate"
                            rules={{ required: "Emirate is required" }}
                            render={({ field }) => (
                                <Dropdown {...field} options={emirates} optionLabel="name" placeholder="Select Emirate" className={`w-full  border ${errors.emirate ? 'p-invalid' : ''} rounded-md`} />
                            )}
                        />
                        {errors.emirate && <small className="p-error text-red-600">{errors.emirate.message}</small>}
                    </div>

                    {/* Country */}
                    <div className="col-span-1">
                        <Controller
                            control={control}
                            name="country"
                            rules={{ required: "Country is required" }}
                            render={({ field }) => (
                                <Dropdown {...field} options={countries} optionLabel="name" placeholder="Select Country" className={`w-full border ${errors.country ? 'p-invalid' : ''} rounded-md`} />
                            )}
                        />
                        {errors.country && <small className="p-error text-red-600">{errors.country.message}</small>}
                    </div>

                    {/* Landmark */}
                    <div className="col-span-1">
                        <InputText
                            id="landmark"
                            {...register("landmark")}
                            placeholder="Landmark (optional)"
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* Address Type */}
                    <div className="col-span-1">
                        <Controller
                            control={control}
                            name="addressType"
                            rules={{ required: "Address Type is required" }}
                            render={({ field }) => (
                                <Dropdown {...field} options={addressTypes} optionLabel="name" placeholder="Select Address Type" className={`w-full border ${errors.addressType ? 'p-invalid' : ''} rounded-md`} />
                            )}
                        />
                        {errors.addressType && <small className="p-error text-red-600">{errors.addressType.message}</small>}
                    </div>
                    <div className="col-span-full flex items-center">
                        <input
                            type="checkbox"
                            id="default"
                            {...register("default")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="default" className="ml-2 block text-sm text-gray-700">
                            Set as default shipping address
                        </label>
                    </div>
                </form>
            </Dialog>

        </>
    );
}
