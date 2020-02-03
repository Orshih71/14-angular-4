const express = require('express');
const router = express.Router();

/* POST check email exists. */
router.post('/', async (req, res, next) => {
	const {email} = req.body;
	const result = await req.db.collection("users").findOne({"email":email});
	if(result) res.json({"exists":1});
	else res.json({"exists":0});
});

module.exports = router;
