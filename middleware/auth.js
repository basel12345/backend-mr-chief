const config = require('config');
const jwt = require("jsonwebtoken");


module.exports = function auth(req, res, next) {
	const token = req.header("Authorization");
	if (!token) return res.status(401).send("Access denied. No token provided.");

	try {
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
		req.user = decoded;
		next();
	} catch (err) {
		res.status(400).send("Invalid token.");
	}
}
