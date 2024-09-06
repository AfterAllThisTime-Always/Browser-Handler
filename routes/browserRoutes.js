const express = require("express");
const {
  startBrowser,
  stopBrowser,
  getLatestURL,
  cleanupBrowser,
} = require("../controllers/browserController");
const router = express.Router();

router.get("/start", startBrowser);
router.get("/stop", stopBrowser);
router.get("/geturl", getLatestURL);
router.get("/cleanup", cleanupBrowser);

module.exports = router;
