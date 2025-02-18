import React from "react";

const ContactMap = () => {
  return (
    <div className="map-container mt-10 rounded-t-xl overflow-hidden shadow-lg z-50">
      <div className="map-container col-span-1 md:col-span-2 lg:col-span-3 rounded-t-xl overflow-hidden shadow-lg">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80912.26133887904!2d55.227488!3d25.076022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1700012345678!5m2!1sen!2sae"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
