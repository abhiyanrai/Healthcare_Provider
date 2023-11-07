// require("dotenv").config({path:"/opt/intellispine/.env"});
require("dotenv").config();
const express = require("express");
require("express-async-errors");
require("./startup/db");
const morgan = require("morgan");
const cors = require("cors");
// const isAuth = require("./app/middlewares/isAuth")
// const checkUserExists = require("./app/middlewares/checkUserExists")
const fileUpload = require("express-fileupload");
const error = require("./app/middlewares/error");
const v1Routes = require("./app/routes/v1/routes");
const app = express();
const path = require("path");
const moment = require("moment");
const hbs = require("hbs");
const stripeController = require("./app/controllers/common/stripe.controller");

app.use(cors());
// app.use(UnAuthorizedError)
app.use(morgan("dev"));

// stripe webhook api
app.post("/api/v1/common/stripe/webhook", express.raw({ type: 'application/json' }), stripeController.webhook);

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));


// Register the 'moment' helper for Handlebars
hbs.registerHelper('moment', function (date, format) {
  return moment(date).format(format);
});

hbs.registerHelper('inc', function (value) {
  return value + 1;
});
// View Engine Setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// app.use(isAuth)
app.use("/api/v1", v1Routes);


app.use(error);

// const util = require("./app/utils/utils");
// util.deleteOtpUsers();
// const pdf = require("./app/controllers/common/pdf.controller")
// pdf.createPdf();


// listening
app.get("/", (req, res) => { res.send("Welcome to intellispine ") })
const port = process.env.PORT;
app.listen(port, () => { console.log(`listening to port ${port}`) });
