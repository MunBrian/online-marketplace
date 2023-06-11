require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/api/payment", async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product_name,
              images: [item.product_pic],
            },
            unit_amount: item.product_price * 100,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.SERVER_URL}/checkout?stripe_referrer=true`,
      cancel_url: `${process.env.SERVER_URL}/cancel?stripe_referrer=true`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
