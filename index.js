import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "my_secret_token"; // ইচ্ছেমতো নিজের সিক্রেট টোকেন বসাও

// ✅ Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 💬 Messenger message receiver
app.post("/webhook", (req, res) => {
  console.log("📩 Incoming webhook event:", JSON.stringify(req.body, null, 2));
  res.status(200).send("EVENT_RECEIVED");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
