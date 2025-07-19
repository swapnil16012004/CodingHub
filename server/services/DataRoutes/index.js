const express = require("express");
const router = express.Router();
const CombinedData = require("../../Data");
const { isLoggedIn } = require("../../middleware");

router.get("/", isLoggedIn, async (req, res) => {
  res.json({ Data: CombinedData });
});

module.exports = router;
