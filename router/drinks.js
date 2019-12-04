const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Drinks = require('../model/drinks');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get("/getAllDrinks", auth, async (req, res) => {
	try {
		const drinks = await Drinks.find();
		return res.send(drinks);
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});

router.get("/getOneDrink/:id", auth, async (req, res) => {
	try {
		const drink = await Drinks.findById(req.params.id);
		if (!drink) return res.status(404).send("Not find this drink")
		return res.send(drink);
	} catch (err) {
		res.status(500).send(err.messsage)
	}
})

router.post("/addDrinks", [auth, admin], async (req, res) => {
	try {
		const schema = {
			product: Joi.string().min(0).required(),
			cost: Joi.number().required(),
			price: Joi.number().required(),
			ingredients: Joi.string().min(3).required(),
		}

		const result = Joi.validate(req.body, schema);

		if (result.error) {
			return res.send({
				status: false,
				message: result.error.details[0].message
			})
		}
		const newDrinks = await new Drinks({
			product: req.body.product,
			cost: req.body.cost,
			price: req.body.price,
			ingredients: req.body.ingredients
		});
		await newDrinks.save((err, drink) => {
			if (err) {
				return res.send({
					status: false,
					message: "Falid to save the drink"
				});
			};
			res.send({
				status: true,
				message: "Drink saved",
				drink
			});
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	}
});

router.put("/UpdateDrink/:id", [auth, admin], async (req, res) => {
	try {
		const schema = {
			product: Joi.string().min(0).required(),
			cost: Joi.number().required(),
			price: Joi.number().required(),
			ingredients: Joi.string().min(3).required(),
		}

		const result = Joi.validate(req.body, schema);

		if (result.error) {
			return res.status(400).send(result.error.details[0].message)
		}

		const drink = await Drinks.findByIdAndUpdate(req.params.id, {
			product: req.body.product,
			cost: req.body.cost,
			price: req.body.price,
			ingredients: req.body.ingredients
		}, { new: true });

		if (!drink) return res.status(404).send("Not find this drink");

		await drink.save((err, drink) => {
			if (err) {
				res.send({
					status: false,
					message: "Falid to update the drink"
				});
			};
			res.send({
				status: true,
				message: "Drink updated"
			});

		})
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});

router.delete("/deleteDrink/:id", [auth, admin], async (req, res) => {
	try {
		const drink = await Drinks.findByIdAndRemove(req.params.id);
		if (!drink) return res.status(404).send("Not find this drink");
		return res.send({
			sccess: true,
			message: "Drink Removed",
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	}
})

module.exports = router;