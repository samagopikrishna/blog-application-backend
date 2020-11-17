const express = require("express");
const Admin = require("../models/Admin");
const { compareHash } = require("../utils/hash");
const { sign } = require("../utils/jwtService");

const AdminRouter = express.Router();

AdminRouter.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).exec();
    if (admin) {
      const result = await compareHash(password, admin.passwordHash);
      if (result) {
        const jwtToken = sign({
          sub: "admin",
          email
        });
        res.cookie("jwt", jwtToken, {
          httpOnly: true,
          secure: true
        });
        res.status(200).json({});
      } else {
        res.status(400).send("Invalid User");
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
}).get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = AdminRouter;
