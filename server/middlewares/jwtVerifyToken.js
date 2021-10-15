import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (authorization) {
    //bearer MXJDO21...
    const token = authorization.slice("7");
    const {secret} = process.env;
    try {
      let decoded = jwt.verify(token, secret);
      console.log("decoded ", decoded);
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ message: "Sesion Expirada" });
      } else {
        res.status(500).end();
      }
    }
  } else {
    res.status(401).send("NO TIENES PERMISO");
  }
}
