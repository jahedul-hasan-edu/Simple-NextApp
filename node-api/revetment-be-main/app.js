const express = require("express");
const app = express();
const port = 5001;

// body parser
const bodyParser = express.json();
app.use(bodyParser);

// cors
const cors = require("cors");
app.use(cors());

// routes
const routes = require("./routes");
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
