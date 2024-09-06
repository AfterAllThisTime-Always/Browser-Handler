const express = require("express");
const app = express();
const PORT = 3000;

const browserRoutes = require("./routes/browserRoutes");

app.use("/", browserRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
