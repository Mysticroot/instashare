//"/c/Program Files (x86)/cloudflared/cloudflared.exe" tunnel --url http://localhost:3000

const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "my_verify_token";

app.get("/", (req, res) => {
  res.send("Instagram Reel POC is running");
});

// Meta webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook verification request");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

// Instagram messages / Reel webhooks
app.post("/webhook", (req, res) => {
  console.log("\n========== INSTAGRAM WEBHOOK ==========\n");

  console.log(JSON.stringify(req.body, null, 2));

  console.log("\n=======================================\n");

  res.sendStatus(200);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});