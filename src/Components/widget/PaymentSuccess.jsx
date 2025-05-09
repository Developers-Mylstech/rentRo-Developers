// src/components/PaymentSuccess.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentIntent = location.state?.paymentIntent;

  useEffect(() => {
    if (!paymentIntent) {
      navigate('/');
    }
  }, [paymentIntent, navigate]);

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <FaCheckCircle className="success-icon" />
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        
        {paymentIntent && (
          <div className="payment-details">
            <p>Amount: AED {(paymentIntent.amount / 100).toFixed(2)}</p>
            <p>Transaction ID: {paymentIntent.id}</p>
          </div>
        )}
        
        <button 
          onClick={() => navigate('/')} 
          className="return-home-button"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;