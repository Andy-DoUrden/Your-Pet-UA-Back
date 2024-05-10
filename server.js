const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose
  .connect(uriDb)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `\n\x1b[32mSuccesful\x1b[0m database connection. Use our API on \x1b[36mhttps://goit-team-03-node.onrender.com/`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not\x1b[31m running\x1b[0m. Error message: ${err.message}`);
    process.exit(1);
  });
