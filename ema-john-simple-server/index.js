const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb://localhost:27017`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ycs7beo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productCollection = client.db("emaJohnSimple").collection("products");
    app.get("/products", async (req, res) => {
      const page = req.query.page;
      const size = req.query.size;
      console.log(page, size);
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      // const products = await cursor.limit(10).toArray();
      const count = await productCollection.estimatedDocumentCount();
      // res.send(products);
      res.send({ count, products });
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send(`ema john server is running`);
});

app.listen(port, (req, res) => {
  console.log(`ema-john-server is running on port ${port}`);
});
