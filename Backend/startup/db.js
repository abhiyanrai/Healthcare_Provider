const { default: mongoose } = require("mongoose");

const { DB_URL } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to mongodb...");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });