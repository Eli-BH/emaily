const express = require("express");
const app = express();
// get get info
//post send info
// put update all the properties of something
// delete delet something
//patch update one or two properties of something

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
//look at the environment for an assigned port
//if not, set 5000

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
