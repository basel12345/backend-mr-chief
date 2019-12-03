const express = require("express");
const router = express.Router();
const Joi = require("joi")
const Services = require("../model/services");


router.get("/getAllServices", async (req, res) => {
	try {
		const services = await Services.find();
		return res.send(services);
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});

router.get("/getOneService/:id", async (req, res) => {
	try {
		const service = Services.findById(req.params.id);
		if (!service) return res.status(404).send("Not find this Service");
		return res.send(service);
	} catch (err) {
		res.status(500).send(err.messsage)
	}
})


router.post("/addServices", async (req, res) => {
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

		const newServices = await new Services({
			product: req.body.product,
			cost: req.body.cost,
			price: req.body.price,
			ingredients: req.body.ingredients
		});
		await newServices.save((err, services) => {
			if (err) {
				res.send({
					status: false,
					message: "Falid to save the Service"
				});
			};
			res.send({
				status: true,
				message: "Service saved",
				services
			});
		})
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});


router.put("/UpdateService/:id", async (req, res) => {
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

		const service = await Services.findByIdAndUpdate(req.params.id, {
			product: req.body.product,
			cost: req.body.cost,
			price: req.body.price,
			ingredients: req.body.ingredients
		}, { new: true });

		if (!service) return res.status(404).send("Not find this service");

		await service.save((err, service) => {
			if (err) {
				res.send({
					status: false,
					message: "Falid to edit the Service"
				});
			};
			res.send({
				status: true,
				message: "Service edited"
			});
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	};
});

router.delete("/deleteServices/:id", async (req, res) => {
	try {
		const service = await Services.findByIdAndRemove(req.params.id);
		if (!service) return res.status(404).send("Not find this service");

		return res.send({
			sccess: true,
			message: "Service Removed",
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	}
})

module.exports = router;