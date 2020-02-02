const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res, next) => {
  let {username, password, email} = req.body;
  let encPass = await bcrypt.hash(password, saltRounds);
  let token = jwt.sign({
    "username": username,
    "email": email
  }, "privateKey",{ expiresIn: '10m' });
  let result = await req.db.collection("users").insert({
    "username": username,
    "email": email,
    "password": encPass
  });
  res.setHeader("Authorization", "Bearer " + token);
  res.json({"success":1})
});

module.exports = router;
