import {Helmet} from "react-helmet";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useLoaderData} from "react-router-dom";

// TODO: provide pk
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    const data = useLoaderData();
    console.log('data', data);
    const price = parseFloat(data.price.toFixed(2))
    return (
        <div>
            <Helmet title="SM Academy/payment" />
            <SectionTitle heading='make your payment' />
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} data={data} />
            </Elements>
        </div>
    );
};

export default Payment;