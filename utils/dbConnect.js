const mongoose = require("mongoose");

const DBCluster = process.env.DATABASE;
const DBLocal = process.env.DATABASE_LOCAL;

let DB_URL;

if (process.env.NODE_ENV === "development") {
  DB_URL = DBLocal;
} else if (process.env.NODE_ENV === "production") {
  DB_URL = DBCluster.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
}

module.exports = () => {
  console.log("connecting to DB...");

  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
