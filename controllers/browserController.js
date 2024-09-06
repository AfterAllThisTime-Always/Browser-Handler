const browserService = require("../services/browserService");

const startBrowser = (req, res) => {
  const { browser, url } = req.query;

  if (!browser || !url) {
    return res.status(400).send("Browser and URL are required.");
  }

  browserService.startBrowser(browser, url, (error, message) => {
    if (error) {
      return res.status(500).send("Error starting browser: " + error.message);
    }
    res.send(message);
  });
};

const stopBrowser = (req, res) => {
  const { browser } = req.query;

  if (!browser) {
    return res.status(400).send("Browser is required.");
  }

  browserService.stopBrowser(browser, (error, message) => {
    if (error) {
      return res.status(500).send("Error stopping browser: " + error.message);
    }
    res.send(message);
  });
};

const getLatestURL = (req, res) => {
  const { browser } = req.query;

  if (!browser) {
    return res.status(400).send("Browser is required.");
  }

  const url = browserService.getLatestURL(browser);
  if (url) {
    res.send(`Latest URL: ${url}`);
  } else {
    res.status(404).send("No URL found for the specified browser.");
  }
};

const cleanupBrowser = (req, res) => {
  const { browser } = req.query;

  if (!browser) {
    return res.status(400).send("Browser is required.");
  }

  browserService.cleanupBrowser(browser, (error, message) => {
    if (error) {
      return res
        .status(500)
        .send("Error cleaning up browser data: " + error.message);
    }
    res.send(message);
  });
};

module.exports = {
  startBrowser,
  stopBrowser,
  cleanupBrowser,
  getLatestURL,
};
