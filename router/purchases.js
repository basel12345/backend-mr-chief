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
			data: Joi.date().required(),
			value: Joi.number().required(),
			Ingredients: Joi.string().min(3).required(),
		}

		const result = Joi.validate(req.body, schema);

		if(result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		const purchases = await new Purchases({
			date: req.body.data,
			value: req.body.value,
			Ingredients: req.body.Ingredients
		});

		await purchases.save((err, purchases) => {
			if (err) {
				res.send({
					sccess: false,
					message: "Falid to save the purchases"
				})
			};
			return res.send({
				sccess: true,
				message: "Purchases saved",
				purchases
			});
		})
	} catch (err) {
		res.status(500).send(err.message);
	}
})


module.exports = router;