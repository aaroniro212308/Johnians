const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");



const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(bodyParser.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit(1); // Exit the application if the database connection fails.
  });


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/johnian.routes")(app);

require("./app/routes/payment.routes")(app);

  //mail post---
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "Thisismicrowe@gmail.com",
    pass: "cdkx mwve rsom vwxq",
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: "Thisismicrowe@gmail.com",
    to,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
