const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://afroz:afrozidyllic@cluster0.apmwml7.mongodb.net/?appName=Cluster0", {

  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// parse JSON bodies
app.use(express.json());

const Candidate = require("./models/Candidate");

app.post("/signalhire-callback", async (req, res) => {
  const item = req.body[0];
  const candidate = item.candidate || {};

  const fullName = candidate.fullName || "";
  const contacts = candidate.contacts || [];
  const social = candidate.social || [];

  try {
    await Candidate.create({
      item: item.item,       // LinkedIn URL
      fullName: fullName,
      rawCandidate: candidate,
      contacts: contacts,
      social: social
    });

    console.log("Saved webhook data to MongoDB");
    res.status(200).send("OK");
  } catch (error) {
    console.error("MongoDB insert error:", error);
    res.status(500).send("Error saving data");
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Webhook server listening on port", PORT);
});
