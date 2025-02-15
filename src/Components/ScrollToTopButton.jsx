import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to toggle button visibility
  const handleScroll = () => {
    if (window.scrollY > 1520) { // Adjust threshold as needed
      setIsVisible(true); // Show button when scrolled down 1520px
    } else {
      setIsVisible(false); // Hide button when near the top
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 w-16 right-6 p-4 bg-white text-blue-900 z-50 rounded-md mb-20 shadow-lg overflow-hidden hover:scale-110 transition-all duration-500 sm:hover:scale-90"
        >
          {/* Water effect */}
          <span className="absolute inset-0 w-full h-full bg-blue-300 opacity-40 scale-0 hover:scale-100 hover:opacity-60 rounded-md transition-all duration-500"></span>
          
          {/* Button Icon (with bold arrow) */}
          <span className="font-extrabold text-4xl">↑</span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
