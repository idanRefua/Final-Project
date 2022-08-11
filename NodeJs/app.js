require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api");
const chalk = require("chalk");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectToDb = require("./bin/connectDB");
const router = require("./routes/api");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

connectToDb
  .then(() => {
    console.log(chalk.magentaBright.bold("connected to MongoDb!"));
  })
  .catch((error) => {
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`));
  });
const port = process.env.PORT;
app.listen(process.env.PORT, () =>
  console.log(
    chalk.blueBright.bold(`server run on: http://localhost:${process.env.PORT}`)
  )
);
module.exports = router;
