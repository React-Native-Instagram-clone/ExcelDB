const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM jewelry", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/create", (req, res) => {
  const values = req.body.values;
  console.log(values);
  db.query(
    `INSERT INTO jewelry (ItemNos, JewelryType, BRAND, Size, Detail, Particulars, Metal, GrossWt, StartPrice, Remarks)
          VALUES${values}`,

    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
