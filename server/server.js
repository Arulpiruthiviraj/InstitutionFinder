require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
var cors = require("cors");
const path = require("path");

const app = express();
//connecting to the database
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

// routes list
const RestaurantRouter = require("./routes/RestaurantRoutes");

// routes
app.use("/api/v1", RestaurantRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
