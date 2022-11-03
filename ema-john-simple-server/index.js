const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`ema john server is running`);
});

app.listen(port, (req, res) => {
  console.log(`ema-john-server is running on port ${port}`);
});
