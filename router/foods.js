const express = require('express');
const router = express.Router();
const Joi = require("joi");
const Food = require('../model/foods')
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.get('/getAllFoods', async (req, res) => {
	try {
		const foods = await Food.find();
		return res.send(foods);
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});


router.get('/getOneFood/:id', async (req, res) => {
	try {
		const food = await Food.findById(req.params.id);
		if (!food) return res.status(404).send("Not find this food");
		return res.send(food);
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});

router.post('/addFood',[auth,admin], async (req, res) => {
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
			message: "Falid to save the drink"
		});
	}


	try {
		const newFood = await new Food({
			product: req.body.product,
			cost: req.body.cost,
			price: req.body.price,
			ingredients: req.body.ingredients
		});

		await newFood.save((err, food) => {
			if (err) {
				return res.send({
					status: false,
					message: "Falid to save the food"
				})
			};
			return res.send({
				status: true,
				message: "Food saved",
				food
			});
		});

	} catch (err) {
		res.status(500).send(err.messsage)
	};
});


router.put('/UpdateFood/:id', async (req, res) => {
	try {
		const schema = {
			product: Joi.string().min(0).required(),
			cost: Joi.number().required(),
			price: Joi.number().required(),
			ingredients: Joi.string().min(3).required(),
		}
	
		const result = Joi.validate(req.body, schema);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		const food = await Food.findByIdAndUpdate(req.params.id, {

			product: req.body.product,
			cost: req.body.cost,
			price: req.body.price,
			ingredients: req.body.ingredients

		}, { new: true });

		if (!food) return res.status(404).send("Not find this food");
		await food.save((err, food) => {
			if (err) {
				return res.send({
					sccess: false,
					message: "Faild to update the food",
				});
			};

			return res.send({
				sccess: true,
				message: "Food Updated"
			});
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});

router.delete("/deleteFood/:id", async (req, res) => {
	try {
		const food = await Food.findOneAndRemove(req.params.id);
		if (!food) return res.status(404).send("Not find this food");

		return res.send({
			sccess: true,
			message: "Food Removed",
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	};
})

module.exports = router;