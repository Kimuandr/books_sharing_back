const express = require("express");
const config = require("./config/config");
const sequelize = require("./db/db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const User = require("./db/user");
const Book = require("./db/book");
const cors = require("cors");

const PORT = 8080 || config.port;

const app = express();

app.use(express.json());
app.use(cors());

const tablesCreate = async (force = false) => {
	try {
		sequelize.sync({
			force
		});
		sequelize.authenticate();
		console.log("Connection has been established successfully");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

app.use(express.urlencoded({
	extended: true
})); // instead of 'body-parser'
app.use("/api", userRouter);
app.use("/api", bookRouter);

app.listen(PORT, () => console.log(`Port ${PORT}`));
