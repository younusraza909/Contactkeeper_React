const express = require("express");
const router = express.Router();

//@route  GET api/users
//@desc   Logged in user
//@access  Private

router.get("/", (req, res) => {
  res.send("Get Logged In user");
});

//@route  POST api/users
//@desc   auth user & get token
//@access  Public

router.post("/", (req, res) => {
  res.send("TO Authenticate user");
});

module.exports = router;
