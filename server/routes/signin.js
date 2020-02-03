const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST users listing. */
router.post('/', async (req, res, next) => {
	let {username, password} = req.body;
	let user = await req.db.collection("users").findOne({"username": username});
	let result = await bcrypt.compare(password, user.password);
	let token = jwt.sign({
		"username": username,
	}, "privateKey", {expiresIn: '10m'});
	
	// res.setHeader("Authorization", "Bearer " + token);
	if (result) res.json({"success": 1, "token": token});
	else res.json({"success": 0});
});

module.exports = router;
