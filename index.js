const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

//use middleware

app.use(cors());
app.use(express.json());

//mongodb username and password

const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const uri = `mongodb+srv://${username}:${password}@cluster0.6euurqe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const roomCollections = client.db("aircncDB").collection("rooms");

    app.get("/rooms",async (req,res)=>{
        const result = await roomCollections.find().toArray();
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Airbnd is running now");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
