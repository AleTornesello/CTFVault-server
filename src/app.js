const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.get("/status", (req, res) => {
  res.send({
    message: "hello world"
  });
})

console.log(`Listening on port ${process.env.PORT || 8081}`);
app.listen(process.env.PORT || 8081);