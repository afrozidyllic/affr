const express = require("express");
const app = express();

// parse JSON bodies
app.use(express.json());

app.post("/signalhire-callback", (req, res) => {
  const data = req.body[0];  // array item
  const candidate = data.candidate;

  const fullName = candidate.fullName;

  // contacts array may include emails & phones
  const emails = [];
  const phones = [];

  (candidate.contacts || []).forEach(contact => {
    if (contact.type === "email") {
      emails.push(contact.value);
    }
    if (contact.type === "phone") {
      phones.push(contact.value);
    }
  });

  console.log("Name:", fullName);
  console.log("Emails:", emails);
  console.log("Phones:", phones);

  res.sendStatus(200);  // acknowledge webhook
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Webhook server listening on port", PORT);
});
