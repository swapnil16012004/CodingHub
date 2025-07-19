if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const DataRouter = require("./services/DataRoutes");
const UserRouter = require("./services/UserRoutes");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URL =
  process.env.ATLASDB_URL ||
  "mongodb+srv://pawarswapnil3305:KxaibqIkJvmISEFf@cluster0.ej4mfzo.mongodb.net/codinghub?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const allowedOrigins = [
  "http://localhost:5173",
  "https://coding-hub-ten.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", DataRouter);
app.use("/api", UserRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
