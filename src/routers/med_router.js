const express = require("express");
const router = express.Router();
const med = require("../services/med_service");

router.get("/", async function (req, res, next) {
  try {
    res.json(await med.getAllMeds());
  } catch (err) {
    console.error(`Error while getting meds`, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    if (req.params.id != parseInt(req.params.id)) return res.sendStatus(400);
    res.json(await med.getMedById(parseInt(req.params.id)));
  } catch (err) {
    console.error(`Error while getting med`, err.message);
    next(err);
  }
});

module.exports = router;
