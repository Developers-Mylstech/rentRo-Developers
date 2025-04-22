import React from "react";
import contactBg from "../assets/contactBg.jpg";
import "../index.css";
import ContactForm from "../Components/form/ContactForm"; // Import form component
import ContactMap from "../Components/widget/ContactMap"; // Import map component

const ContactUs = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="contact-section pt-4"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-full w-full justify-center items-center py-16">
            <ContactForm /> {/* Using the ContactForm component */}
          </div>
        </div>

        <ContactMap /> {/* Using the ContactMap component */}
      </section>

      
      {/* <ScrollToTopButton /> */}
    </>
  );
};

export default ContactUs;
