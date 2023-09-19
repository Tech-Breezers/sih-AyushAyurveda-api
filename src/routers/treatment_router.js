const express = require("express");
const router = express.Router();
const treat = require("../services/treatment_service");

router.get("/", async function (req, res, next) {
  try {
    res.json(await treat.getAllTreatments());
  } catch (err) {
    console.error(`Error while getting treatments`, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    if (req.params.id != parseInt(req.params.id)) return res.sendStatus(400);
    res.json(await treat.getTreatmentById(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting treatment`, err.message);
    next(err);
  }
});

module.exports = router;
