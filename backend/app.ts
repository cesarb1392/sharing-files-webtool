import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import errorHandler from "errorhandler";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
} else {
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
}

app.get("/");

export default app;
