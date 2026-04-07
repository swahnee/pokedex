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

  if (
    req.body.text ===
    "Forms colonies in\nperpetually dark\nplaces. Uses\fultrasonic waves\nto identify and\napproach targets."
  ) {
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
  }

  return res.json({
    success: {
      total: 1,
    },
    contents: {
      translated: "Yoda translated Mewtwo description",
      text: "Original Mewtwo description",
      translation: "yoda",
    },
  });
});

app.post("/v1/translate/shakespeare", (req, res) => {
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
      translated: "Shakespeare translated Garchomp description",
      text: "Original Garchomp description",
      translation: "shakespeare",
    },
  });
});

app.listen(5000, () => {
  console.log("App started on port 5000");
});
