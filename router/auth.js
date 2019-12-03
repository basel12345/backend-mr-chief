const config = require('config');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../model/user");


router.post("/login", async (req, res) => {
	try {
		const schema = {
			email: Joi.string().email({ minDomainAtoms: 2 }).required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
		}

		const result = Joi.validate(req.body, schema);

		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send("Invalid email or passsword");

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) return res.status(400).send("Invalid email or passsword");

		const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.get("jwtPrivateKey"));

		return res.send({
			token,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
})





module.exports = router;