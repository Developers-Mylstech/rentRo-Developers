// import React, { useState } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { BsQuestionOctagon } from "react-icons/bs";
// import OceanScene from '../Components/OceanScene';

// const faqData = [
//   {
//     question: "What payment methods do you accept?",
//     answer: "We accept Visa, MasterCard, and PayPal."
//   },
//   {
//     question: "What is your shipping policy?",
//     answer: "We offer standard shipping, typically taking within 1 business day, and expedited shipping for faster delivery."
//   },
//   {
//     question: "What is your return/exchange policy?",
//     answer: "We offer a hassle-free return and exchange policy within 30 days of purchase. Items must be unused and in their original condition with tags attached."
//   },
//   {
//     question: "How can I track my order?",
//     answer: "Once your order has been shipped, you will receive an email. You can track your order using the order number on our Order Tracking page."
//   },
//   {
//     question: "Can I modify or cancel my order after it has been placed?",
//     answer: "We process orders quickly to ensure fast shipping. If you need to modify or cancel your order, please contact our customer support team as soon as possible. We'll do our best to accommodate your request."
//   },
//   {
//     question: "How can I contact customer support?",
//     answer: "You can reach our customer support team via email at info@rentro.ae or by phone at +971 50 670 9963."
//   }
// ];

// const FAQSection = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleAnswer = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <>
//       <OceanScene />
//       <div className="w-full mx-auto p-4 md:p-8">
//         <div className="space-y-4 md:w-[85%] mx-auto">
//           {faqData.map((item, index) => (
//             <div key={index} className="border-b px-2 border-gray-200">
//               <button
//                 onClick={() => toggleAnswer(index)}
//                 className="w-full text-left flex justify-between items-start py-4 text-gray-800 hover:text-blue-800 transition-all duration-300"
//               >
//                 <div className="flex items-start space-x-2">
//                   <BsQuestionOctagon className="text-xl mt-[6px]" />
//                   <span className="text-lg w-[85%] md:w-[100%] font-semibold">
//                     {item.question}
//                   </span>
//                 </div>
//                 <span className="mt-[6px]">
//                   {activeIndex === index ? (
//                     <FaChevronUp className="h-5" />
//                   ) : (
//                     <FaChevronDown className="h-5" />
//                   )}
//                 </span>
//               </button>
//               <div
//                 className={`overflow-hidden transition-all duration-300 ${
//                   activeIndex === index ? 'max-h-screen' : 'max-h-0'
//                 }`}
//               >
//                 <p className="pb-4 md:w-[100%]  w-[90%] mx-auto text-gray-600">{item.answer}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FAQSection;


import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsQuestionOctagon } from "react-icons/bs";
import OceanScene from '../Components/OceanScene';

const faqData = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, and PayPal."
  },
  {
    question: "What is your shipping policy?",
    answer: "We offer standard shipping, typically taking within 1 business day, and expedited shipping for faster delivery."
  },
  {
    question: "What is your return/exchange policy?",
    answer: "We offer a hassle-free return and exchange policy within 30 days of purchase. Items must be unused and in their original condition with tags attached."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has been shipped, you will receive an email. You can track your order using the order number on our Order Tracking page."
  },
  {
    question: "Can I modify or cancel my order after it has been placed?",
    answer: "We process orders quickly to ensure fast shipping. If you need to modify or cancel your order, please contact our customer support team as soon as possible. We'll do our best to accommodate your request."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via email at info@rentro.ae or by phone at +971 50 670 9963."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const questionRefs = useRef([]);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    questionRefs.current[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      questionRefs.current.forEach((ref, index) => {
        const rect = ref.getBoundingClientRect();
        // Close all answers on scroll
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveIndex(null);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <OceanScene />
      <div className="w-full scrollbar-hide  mx-auto p-4 md:p-8 flex lg:justify-between relative">
        {/* FAQ Section */}
        <div className="space-y-4 md:w-[70%] w-full scrollbar-hide  overflow-y-auto max-h-[80vh]">
          {faqData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (questionRefs.current[index] = el)}
              className={`border-b scrollbar-hide  px-2 border-gray-200 scroll-mt-20 transition-all duration-300`}
              id={`question-${index}`}
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left flex justify-between items-start py-4 text-gray-800 hover:text-blue-800 transition-all duration-300"
              >
                <div className="flex items-start space-x-2">
                  <BsQuestionOctagon className="text-xl mt-[6px]" />
                  <span className="text-lg w-[85%] md:w-[100%] font-semibold">
                    {item.question}
                  </span>
                </div>
                <span className="mt-[6px]">
                  {activeIndex === index ? (
                    <FaChevronUp className="h-5" />
                  ) : (
                    <FaChevronDown className="h-5" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-4 md:w-[100%] w-[90%] mx-auto text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Question Box - Visible on lg and above */}
        <div className="hidden lg:block lg:w-[25%] scrollbar-hide  sticky top-20 self-start overflow-y-auto border-l pl-4 max-h-[80vh]">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Jump to a Question:</h3>
          <ul className="space-y-2 scrollbar-hide ">
            {faqData.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => toggleAnswer(index)}
                  className={`text-left w-full transition-colors duration-300 p-2 rounded-md ${
                    activeIndex === index
                      ? 'bg-blue-100 text-blue-800 font-bold'
                      : 'text-blue-800 hover:text-blue-600'
                  }`}
                >
                  {item.question}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FAQSection;


