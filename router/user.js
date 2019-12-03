const config = require('config');
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../model/user");


router.post("/register", async (req, res) => {
	try {
		const schema = {
			name: Joi.string().min(3).required(),
			email: Joi.string().email({ minDomainAtoms: 2 }).required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
			repeatPassword: Joi.any().valid(Joi.ref("password")).required().options({ language: { any: { allowOnly: 'must match password' } } }),
			isAdmin: Joi.boolean()
		};

		const result = Joi.validate(req.body, schema);

		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}

		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send("User already registered");

		user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			repeatPassword: req.body.repeatPassword,
			isAdmin: req.body.isAdmin
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.get("jwtPrivateKey"));
		await user.save((err, user) => {
			if (err) {
				console.log(err)
				return res.send({
					status: false,
					message: "Falid to registered the user"
				});
			};
			return res.header("x-auth-token", token).send({
				status: true,
				message: "user register",
				user: {
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token
				}
			})
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
})





module.exports = router;