const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_P_KEY);

let resp = path.resolve(__dirname, "public");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  resp = path.resolve(resp, "test.txt");
  res.send("Hello");
});
app.get("/home", (req, res, next) => {
  // res.send("reached home");
  console.log("App=", app);
  next();
});

app.get("/error", (req, res, next) => {
  // res.send("Entering DANGER zone");
  next("Danger");
});
app.get("/payment", async (req, res) => {
  // res.send(`you are in Payment page: STRIPE:${stripe.VERSION}`);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: "Jug",
          },
          unit_amount: 3000,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    // customer: "1",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/fail",
  });
  res.send({ url: session.url });
});

app.use((req, res) => {
  res.send("No Such page!!! . ...");
});

app.use((err, req, res, next) => {
  console.log("Entered error zone");
  res.send("Not allowed");
});

app.listen(3001, () => {
  console.log("Server listening at port 3001");
});
