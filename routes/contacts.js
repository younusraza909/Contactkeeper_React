const express = require("express");
const router = express.Router();

//@route  GET api/contacts
//@desc   GET all users contacts
//@access  Private

router.get("/", (req, res) => {
  res.send("Get all Users Contact");
});

//@route  POST api/contacts
//@desc   Add New Contacts
//@access  Private

router.post("/", (req, res) => {
  res.send("Add New Contact");
});

//@route  PUT api/contacts/:id
//@desc   Update Contact
//@access  Private

router.put("/:id", (req, res) => {
  res.send("Update Contacts");
});

//@route  DELETE api/contacts/:id
//@desc   Delete Contact
//@access  Private

router.delete("/:id", (req, res) => {
  res.send("Delete Contacts");
});

module.exports = router;
