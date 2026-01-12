const express = require("express");
const app = express();

// parse JSON bodies
app.use(express.json());

app.post("/signalhire-callback", (req, res) => {
  console.log("SignalHire webhook received:", req.body);

  // Process the incoming data here:
  // e.g. save to database

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Webhook server listening on port", PORT);
});
