import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.post("/v1/translate/yoda", (req, res) => {
  if (!req.body || !req.body.text) {
    return res.status(400).send({
      error: {
        code: 400,
        message: "Bad Request",
      },
    });
  }

  if (req.body.text === "error") {
    return res.status(500).send({
      error: {
        code: 500,
        message: "Internal Server Error",
      },
    });
  }

  return res.json({
    success: {
      total: 1,
    },
    contents: {
      translated: "Yoda translated Zubat description",
      text: "Original Zubat description",
      translation: "yoda",
    },
  });
});

app.listen(5000, () => {
  console.log("App started on port 5000");
});
