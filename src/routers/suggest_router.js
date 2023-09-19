const express = require("express");
const router = express.Router();
const suggest = require("../services/suggest_service");

router.get("/", async function (req, res, next) {
  try {
    const searchTerm = req.query.q;
    res.json(await suggest.suggestAll(searchTerm));
  } catch (err) {
    console.error(`Error while searching`, err.message);
    next(err);
  }
});

router.get("/dis", async function (req, res, next) {
  try {
    res.json(await suggest.suggestDisease());
  } catch (err) {
    console.error(`Error while searching`, err.message);
    next(err);
  }
});

router.get("/med", async function (req, res, next) {
  try {
    res.json(await suggest.suggestMeds());
  } catch (err) {
    console.error(`Error while searching`, err.message);
    next(err);
  }
});

router.get("/symp", async function (req, res, next) {
    try {
      res.json(await suggest.suggestSymptoms());
    } catch (err) {
      console.error(`Error while searching`, err.message);
      next(err);
    }
  });

module.exports = router;
