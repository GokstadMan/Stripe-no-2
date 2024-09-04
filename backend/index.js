import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2020-08-27',
});
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("okay")
})
app.post("/create-payment-intent", async (req, res) => {
    const amount = req.body.amount
    console.log(amount);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * amount,
        currency: "nok",
        automatic_payment_methods: {
            enabled: true
        }
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});


const port = process.env.PORT || 4000
app.listen(port, () => console.log("This wonder is running on:" + port))