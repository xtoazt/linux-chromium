const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const app = express();
let computer;

const configuration = path.join(__dirname, "config/config.json");
const config = JSON.parse(fs.readFileSync(configuration, "utf-8"));

app.use(express.static("public"));

app.get("/computer", async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  try {
    const resp = await axios.post(
      "https://engine.hyperbeam.com/v0/vm",
      {},
      {
        headers: { Authorization: `Bearer ${config.HB_PROD_KEY}` },
      }
    );
    computer = resp.data;
    res.send(computer);
  } catch (error) {
    console.error("Error fetching computer:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`CybriaHB Is On The Run!`)); // corny ass shit
