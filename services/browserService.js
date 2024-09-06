const { exec } = require("child_process");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const browserProcesses = {};
const browserHistory = {};
// const firefoxProfilePath = path.join(
//   "%APPDATA%",
//   "Mozilla",
//   "Firefox",
//   "Profiles",
//   "ondgrdzd.default-release"
// );
// const chromeProfilePath = path.join(
//   "AppData",
//   "Local",
//   "Google",
//   "Chrome",
//   "User Data",
//   "Default"
// );

const startBrowser = (browser, url, callback) => {
  let command;
  if (browser === "chrome") {
    command = `start chrome "${url}"`;
  } else if (browser === "firefox") {
    command = `start firefox "${url}"`;
  } else {
    return callback(new Error("Unsupported browser."));
  }

  exec(command, (error) => {
    if (error) {
      return callback(error);
    }
    browserProcesses[browser] = true;
    browserHistory[browser] = url;
    callback(null, "Browser started and URL opened.");
  });
};

const stopBrowser = (browser, callback) => {
  let command;
  if (browser === "chrome") {
    command = `taskkill /F /IM chrome.exe`;
  } else if (browser === "firefox") {
    command = `taskkill /F /IM firefox.exe`;
  } else {
    return callback(new Error("Unsupported browser."));
  }

  exec(command, (error) => {
    if (error) {
      return callback(error);
    }
    delete browserProcesses[browser];
    callback(null, "Browser stopped.");
  });
};

const getLatestURL = (browser) => {
  return browserHistory[browser] || null;

  //   let dbPath;
  //   if (browser === "firefox") {
  //     dbPath = firefoxProfilePath;
  //   } else if (browser === "chrome") {
  //     dbPath = chromeProfilePath;
  //   } else {
  //     return null;
  //   }

  //   if (!fs.existsSync(dbPath)) {
  //     console.log("Database file not found.");
  //     console.log(chromeProfilePath);

  //     return null;
  //   }

  //   const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

  //   const query =
  //     browser === "firefox"
  //       ? "SELECT url FROM moz_places ORDER BY last_visit_date DESC LIMIT 1"
  //       : "SELECT url FROM urls ORDER BY last_visit_time DESC LIMIT 1";

  //   db.get(query, (err, row) => {
  //     if (err) {
  //       db.close();
  //       return null;
  //     }
  //     db.close();
  //     return row ? row.url : null;
  //   });
};

const cleanupBrowser = (browser, callback) => {
  let command;

  if (browser === "chrome") {
    command = `taskkill /F /IM chrome.exe`;
  } else if (browser === "firefox") {
    command = `taskkill /F /IM firefox.exe`;
  } else {
    return callback(new Error("Unsupported browser."));
  }

  exec(command, (error) => {
    if (error) {
      return callback(error);
    }
    delete browserProcesses[browser];
  });

  if (browser === "chrome") {
    command = `rmdir /S /Q "%LOCALAPPDATA%\\Google\\Chrome\\User Data"`;
  } else {
    command = `rmdir /S /Q "%APPDATA%\\Mozilla\\Firefox\\Profiles"`;
  }

  exec(command, (error) => {
    if (error) {
      return callback(error);
    }
    delete browserProcesses[browser];
    // delete browserHistory[browser];
    callback(null, "Browser data cleaned up.");
  });
};

module.exports = {
  startBrowser,
  stopBrowser,
  getLatestURL,
  cleanupBrowser,
};
