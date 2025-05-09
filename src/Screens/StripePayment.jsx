import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import CheckoutForm from '../Components/form/CheckoutForm';

const stripePromise = loadStripe('pk_test_51RLOsxP9oSOUDJBLqZRCqPycQ0pD06U65h5e6oDLNOdao4GGbWAsd2s8A0Mfb4Hs5Ty1lENR0VgaF0UrsJPTjizn00WMqTFFDP');

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentIntent = async (checkoutId) => {
    console.log(checkoutId, 'checkoutId');
    setLoading(true);
    setError(null);
    try {
      if(!checkoutId) return;
      const response = await axiosInstance.post('/payments/create-payment-intent', {
        checkoutId: checkoutId
      });
      setClientSecret(response.data.clientSecret);
      console.log(response, 'response');
      return response?.data?.clientSecret;
    } catch (err) {
      setError('Failed to initialize payment');
      console.error('Payment intent error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const options = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0570de',
      }
    }
  } : {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0570de',
      }
    }
  };
  
  return (
    <>
    
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
          clientSecret={clientSecret}
            onCreatePaymentIntent={createPaymentIntent}
            loading={loading}
            error={error}
          />
        </Elements>
      
    </>
  );
};

export default StripePayment;
