import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

export const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

export const getStripeClient = () => {
    let stripePromise;
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
    }

    return stripePromise;
};