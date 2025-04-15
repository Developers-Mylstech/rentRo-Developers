import React, { useState } from "react";
import { useForm } from "react-hook-form";

const WaterFilterSubscriptionForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [type, setType] = useState("individual");

  const onSubmit = (data) => {
    console.log(data);
    alert("Submitted.");
    reset();
  };

  const Input = ({ label, name, type = "text", ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        className="w-full px-2 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        {...rest}
      />
    </div>
  );

  const Select = ({ label, name, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
      <select
        {...register(name)}
        className="w-full px-2 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-semibold text-[#3a7bd5] mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="md:text-3xl text-xl font-bold text-center text-[#3a7bd5] mt-14">
        Monthly Water Filter Subscription
      </h1>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-300 mt-6">
        {["individual", "company"].map((tab) => (
          <button
            key={tab}
            onClick={() => setType(tab)}
            className={`px-6 py-2 font-medium capitalize transition duration-200 ${
              type === tab
                ? "text-[#3a7bd5] border-b-2 border-[#3a7bd5]"
                : "text-gray-500 hover:text-[#3a7bd5]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {type === "individual" ? (
          <>
            <Section title="Personal Information">
              <Input label="Full Name" name="fullName" />
              <Input label="Date of Birth" name="dob" type="date" />
              <Input label="Phone Number" name="phone" />
              <Input label="Email Address" name="email" />
              <Input label="Home Address" name="homeAddress" />
            </Section>

            <Section title="Subscription Details">
              <Select
                label="Plan Type"
                name="planType"
                options={["Basic (1/month)", "Standard (2/month)", "Premium (Unlimited)"]}
              />
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Preferred Delivery Day</label>
                <div className="flex flex-wrap gap-4">
                  {["Monday", "Wednesday", "Friday"].map((day) => (
                    <label key={day} className="flex items-center space-x-2 text-gray-600">
                      <input type="checkbox" value={day} {...register("deliveryDays")} />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Input label="Start Date" name="startDate" type="date" />
            </Section>

            <Section title="Payment Information">
              <Select
                label="Payment Method"
                name="paymentMethod"
                options={["Credit/Debit Card", "Mobile Payment", "Bank Transfer"]}
              />
              <Input label="Billing Address (if different)" name="billingAddress" />
            </Section>

            <Section title="Consent & Signature">
              <Input label="Signature" name="signature" />
              <Input label="Signature Image (optional)" name="signatureImage" type="file" />
              <Input label="Date" name="consentDate" type="date" />
            </Section>
          </>
        ) : (
          <>
            <Section title="Company Information">
              <Input label="Company Name" name="companyName" />
              <Input label="Business Registration Number" name="registrationNumber" />
              <Input label="Contact Person" name="contactPerson" />
              <Input label="Position/Title" name="position" />
              <Input label="Phone Number" name="phone" />
              <Input label="Email Address" name="email" />
              <Input label="Company Address" name="companyAddress" />
            </Section>

            <Section title="Subscription Details">
              <Select
                label="Plan Type"
                name="planType"
                options={["Basic (Up to 5/month)", "Standard (6–20/month)", "Enterprise (Custom)"]}
              />
              <Select
                label="Delivery Schedule"
                name="deliverySchedule"
                options={["Weekly", "Bi-weekly", "Monthly"]}
              />
              <Input
                label="Number of Filters Required per Month"
                name="filtersPerMonth"
                type="number"
              />
              <Input label="Start Date" name="startDate" type="date" />
            </Section>

            <Section title="Payment & Billing">
              <Input label="Billing Contact Name" name="billingContact" />
              <Input label="Billing Email" name="billingEmail" />
              <Select
                label="Payment Method"
                name="paymentMethod"
                options={["Invoice", "Direct Debit", "Credit Card"]}
              />
              <Input label="Billing Address" name="billingAddress" />
            </Section>

            <Section title="Consent & Authorized Signature">
              <Input label="Authorized Signature" name="authorizedSignature" />
              <Input label="Signature Image (optional)" name="signatureImage" type="file" />
              <Input label="Date" name="consentDate" type="date" />
              <Input label="Company Stamp (if available)" name="companyStamp" />
              <Input label="Stamp Image (if available)" name="stampImage" type="file" />
            </Section>
          </>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-[#3a7bd5] text-white font-semibold rounded-lg shadow-md"
          >
            Submit Subscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaterFilterSubscriptionForm;
