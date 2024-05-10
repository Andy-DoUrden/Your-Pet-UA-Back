const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const noticeRouter = require("./routes/api/notices");
const petRouter = require("./routes/api/pets");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");
const newsRouter = require("./routes/api/news");
const ourFriends = require('./routes/api/friends')

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API docs for my pet",
      version: "1.0.0",
      description: "Auto updating docs for the my pet store",
    },
    servers: [
      {
        url: "https://goit-team-03-node.onrender.com/",
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/public", express.static("public"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/api/notices", noticeRouter);
app.use("/api/pets", petRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/news", newsRouter)
app.use("/api/friends", ourFriends)

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Server error" } = err;

  if (message.includes("ENOENT")) {
    message = "Server Error";
  }

  if (err.code === 11000) {
    message = "Server Error. Duplicate data";
  }

  res.status(status).json({ message });
});

module.exports = app;
