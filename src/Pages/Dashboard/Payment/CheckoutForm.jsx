import {Button} from "@mui/material";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import './CheckoutForm.css';

const CheckoutForm = ({price, data}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');



    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price})
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        console.log('card', card);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('error', error);
            toast.error(error.message)
        }
        else {
            console.log('paymentMethod', paymentMethod);
        }

        setProcessing(true);

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            toast.error(confirmError)
        }
        console.log(paymentIntent);

        setProcessing(false);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            const transactionId = paymentIntent.id;
            const payment = {
                email: user?.email,
                transactionId,
                price,
                date: new Date(),
                className: data.className,
                itemId: data._id,
                status: 'pending'
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log('response', res);
                    if (res.data.deleteResult.deletedCount > 0) {
                        toast.success('updated successfully');
                    }
                })
        }

    }

    return (
        <div>
            <form className="w-1/2" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button type="submit" disabled={!stripe || !clientSecret || processing} style={{backgroundColor: '#f0f0f0', color: '#000', marginTop: '30px'}} variant="contained">Pay</Button>
            </form>
            {transactionId && <p className="text-green-600 mt-6">transaction successfully completed with <span className="text-red-400">{transactionId}</span></p>}
        </div>
    );
};

export default CheckoutForm;