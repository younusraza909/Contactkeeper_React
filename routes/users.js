const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//@route  POST api/users
//@desc   To Register A User
//@access  Public

router.post(
  "/",
  [
    check("name", "name is Required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please Enter a password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    res.send("passed");
  }
);

module.exports = router;
