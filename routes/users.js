const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // To find user with this email we use findOne in mongoose
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User Already Exist" });
        // 400 Bad Request
      }

      user = new User({
        name,
        email,
        password,
      });

      // Hashing Password
      const salt = await bcrypt.genSalt(10); //return promises

      user.password = await bcrypt.hash(password, salt); //return promises

      await user.save(); //return promises

      res.send("User Saved");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
      // 500 Server Error
    }
  }
);

module.exports = router;
