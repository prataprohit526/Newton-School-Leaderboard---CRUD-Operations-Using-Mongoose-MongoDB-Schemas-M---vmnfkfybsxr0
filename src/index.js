const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require("./data");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/topRankings", (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;
  if (isNaN(limit)) {
    limit = 20;
  }
  if (isNaN(offset)) {
    offset = 0;
  }

  offset = parseInt(offset);
  limit = parseInt(limit);

  res.json(data.slice(offset, offset + limit));
});

app.use("/", (req, res) => {
  res.status(404).send();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
