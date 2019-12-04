const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Purchases = require("../model/purchases");


router.get("/getAllPurchases", async (req, res) => {
	try {
		const purchases = await Purchases.find();
		return res.send(purchases);
	} catch (err) {
		res.status(500).send(err.message);
	}
});


router.post("/addPurchase", async (req, res) => {
	try {
		const schema = {
			date: Joi.date().required(),
			value: Joi.number().required(),
			Ingredients: Joi.string().min(3).required(),
		}

		const result = Joi.validate(req.body, schema);

		if(result.error) {
			return res.send({
				status: false,
				message: result.error.details[0].message
			})
		}
		const purchases = await new Purchases({
			date: req.body.date,
			value: req.body.value,
			Ingredients: req.body.Ingredients
		});

		await purchases.save((err, purchases) => {
			if (err) {
				res.send({
					status: false,
					message: "Falid to save the purchases"
				})
			};
			return res.send({
				status: true,
				message: "Purchases saved",
				purchases
			});
		})
	} catch (err) {
		res.status(500).send(err.message);
	}
})


module.exports = router;