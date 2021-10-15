import express from "express";
import jwt from "jsonwebtoken";
import jwtVerifyToken from "../middlewares/jwtVerifyToken.js";
const router = express.Router();

let users = [
  {
    nombre: "Ruben",
    correo: "daricoder@gmail.com",
    clave: "1234",
  },
  {
    nombre: "Nicole",
    correo: "nicole@gmail.com",
    clave: "niky123",
  },
];

router.get("/", jwtVerifyToken, (req, res) => {
  console.log("despues de verificar", users);
  res.json(users);
});

router.post("/", (req, res) => {
  console.log("POST /usuarios", req.body);
  const user = req.body;
  if (user) {
    const userFind = users.find((u) => {
      return u.correo === user.correo && u.clave === user.clave;
    });

    if (userFind) {
      const token = jwt.sign({ correo: userFind.correo }, "misecreto", {
        expiresIn: "7d",
      });
      res.json({ ...userFind, token });
      return;
    }
  }
  res.json({ error: "correo o clave invalidos" });
});

export default router;
