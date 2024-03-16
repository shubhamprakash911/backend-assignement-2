require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const {
  errorHandler,
  notFound,
} = require("./middlewares/errorHandlerMiddleware");
const blogRoute = require("./routes/blogRoutes");
const cors = require("cors");
const app = express();

//cors
app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// demo api
app.get("/", (req, res) => {
  res.send("Welcome to Blog application");
});

app.use("/blog", blogRoute);

const PORT = process.env.PORT || 8000;

//error handler middlewares
app.use(notFound);
app.use(errorHandler);

async function conn() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
conn();
