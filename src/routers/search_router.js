const express = require("express");
const router = express.Router();
const search = require("../services/search_service");

router.get("/", async function (req, res, next) {
  try {
    const searchTerm = req.query.q;
    res.json(await search.searchTreats(searchTerm));
  } catch (err) {
    console.error(`Error while searching`, err.message);
    next(err);
  }
});

router.get("/med", async function (req, res, next) {
  try {
    const searchTerm = req.query.q;
    res.json(await search.searchMeds(searchTerm));
  } catch (err) {
    console.error(`Error while searching`, err.message);
    next(err);
  }
});


module.exports = router;
