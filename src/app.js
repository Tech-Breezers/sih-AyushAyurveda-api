const express = require("express");
const cors = require('cors'); 

const medRouter = require("./routers/med_router");
const treatmentRouter = require("./routers/treatment_router");
const searchRouter = require("./routers/search_router");
const suggestRouter = require("./routers/suggest_router");

const app = express();
const port = 3001;

app.use(cors());

app.use("/", express.static("./src/build"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/med", medRouter);
app.use("/api/treat", treatmentRouter);
app.use("/api/search", searchRouter);
app.use("/api/suggest", suggestRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
