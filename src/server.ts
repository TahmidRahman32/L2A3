import express from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import routers from "./router";
const app = express();

app.use(cors());
app.use(express.json());

app.use(routers);

app.get("/", (req, res) => {
   res.send({
      success: true,
      message: "Welcome to the server",
   });
});

app.listen(config.port, () => {
   console.log("✅Server is running on port 5000");
});
// Function to simulate server behavior

async function server() {
   try {
      // console.log(config);

      await mongoose.connect(config.database_url!);
      console.log(`☑️CONNETC TO DATABASE${config.port}`);
   } catch (error) {
      console.error(`❌error server${server} `);
   }
}
server();
