const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function hasToken(req, res, next) {
	let bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ");
		req.token = bearer[1];
		next();
	} else {
		res.send(403);
	}
}

/* GET  listing. */
router.get('/protected', hasToken, function (req, res, next) {
  const {token} = req;
  jwt.verify(token, 'privateKey', function(err, decoded) {
    if (err) {
      next(err);
    }
  });
  res.json({"private": 1});
});

module.exports = router;
