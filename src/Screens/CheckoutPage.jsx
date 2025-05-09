import React from 'react'
import StripePayment from './StripePayment'
import useCartStore from '../Context/CartContext';

export default function CheckoutPage() {
    const { cartItems } = useCartStore();

    return (
        <div>
            <StripePayment  />
        </div>
    )
}
