const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("reached home");
});
app.listen(3001, () => {
  console.log("Server listening at port 3001");
});
