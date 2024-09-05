import React, { useState } from 'react';
import { PayNow, loadStripe } from 'react-stripe-js';

function App() {
  const PayButtonComp = () => {
  const stripe = loadStripe("pk_test_51PiwABDVKC01fR07PftsChIhT6GSN7MY2ZiVjvHXOBoHffasGLS0sXYMXdk6SBaKt4ebtbp2dajEtBrYQBF0itmM00K3WxY1xU")

  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = (amount) => {
    if (!clientSecret) {
      fetch("http://localhost:2727/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret));
    }
  }

  return <>
    <PayNow
      title='Click To Pay'
      successMessage='payment done,creating order please wait....'
      stripe={stripe}
      clientSecret={clientSecret}
      onClick={() => {
        //other input field validation (like name,shipping address,etc)
        //if all field are valid then return true otherwise return false
        createPaymentIntent(55)
      }}
      onPaymentSuccess={() => {
        console.log("wow, payment done....store the order info into db now.");
      }}
    />
  </>
}
}

export default App;