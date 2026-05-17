const express = require("express");
const cors = require("cors");

const filmRouter = require("./src/film/film.router");
const reviewRouter = require("./src/review/review.router");

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Filmcenze backend running."));

app.use("/film", filmRouter);
app.use("/review", reviewRouter);

app.listen(PORT, () => {
  console.log(`Filmcenze backend listening on port ${PORT}`);
});
