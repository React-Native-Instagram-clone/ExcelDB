const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const nodemailer = require("nodemailer");

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

app.get("/email", async (req, res) => {
  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'durgeshdwivedi81@gmail.com',
          pass: 'ykgp disq tfnn vubr'
      }
    });

    // Email options
    const mailOptions = {
      from: "durgeshdwivedi81@gmail.com", // Use environment variable
      to: '',
      cc: '',
      bcc: '',
      subject: 'Your Subject',
      text: 'Hello, this is the body of the email.',
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Send a success response to the client
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);

    // Send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
