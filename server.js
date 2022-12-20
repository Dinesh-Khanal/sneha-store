const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

const app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use routes
app.use("/api/products", require("./routes/products"));
app.use("/api/order", require("./routes/order"));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
//connect to mongodb atlas
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to database");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
