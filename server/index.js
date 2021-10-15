import express from "express";
import routerUser from "./routes/user.js";
import dotenv from "dotenv"
const app = express();

dotenv.config()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("/usuarios",routerUser);

app.get("/", (req, res) => {
  res.send("HELL0 WORLD");
});

app.listen(9000, () => {
  console.log("server in por 9000");
});
