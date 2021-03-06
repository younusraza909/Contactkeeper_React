const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect  database
connectDB();

//init middleware in order to eaccept body in post request
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome To The ContactKeeper API" })
);

//DEFINE ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started At ${PORT}`));
