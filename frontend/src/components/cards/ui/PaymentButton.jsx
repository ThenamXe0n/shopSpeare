import { loadStripe } from "@stripe/stripe-js";
import { FaLock } from "react-icons/fa";
import axiosInstance from "../../../service/axiosInstance";

const stripePromise = loadStripe("pk_test_51OlSaPSIRvECnq9ubEGJf1GCJ6ePclfTKykXzx3h5HQudY0Ljq276CeDIFB6YeGWuorQ6Vw1d0xAd1ujr0BxFXOW00IS3Nqa5n");

function PaymentButton({ cartItems, shippingAddress }) {
  const handleCheckout = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          cartItems,
          shippingAddress,
        },
      );

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-black text-white py-3.5 rounded-full font-semibold text-sm shadow-xl hover:opacity-90 transition flex items-center justify-center gap-2"
    >
       Pay Now
    </button>
  );
}

export default PaymentButton;