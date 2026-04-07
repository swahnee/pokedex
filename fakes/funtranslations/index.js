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

  if (req.body.text.startsWith("It was created")) {
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
  }

  if (req.body.text.startsWith("Forms colonies")) {
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

  return res.status(500).send({
    error: {
      code: 500,
      message: "Internal Server Error",
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

  if (req.body.text.startsWith("When it folds")) {
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
  }

  return res.status(500).send({
    error: {
      code: 500,
      message: "Internal Server Error",
    },
  });
});

app.listen(5000, () => {
  console.log("App started on port 5000");
});
