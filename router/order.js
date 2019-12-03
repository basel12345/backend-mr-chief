const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Order = require("../model/orders");
const Table = require("../model/table");


router.get("/getAllOrder", async (req, res) => {
	try {
		const order = await Order.find();
		return res.send(order);
	} catch (err) {
		res.status(500).send(err.message);
	}
});


router.get("/getOneOrder/:id", async(req,res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) return res.status(404).send(`Not find this order`);
		return res.send(order)
	} catch (err) {
		res.status(500).send(err.message);
	}
})

router.post("/addOrder/:id", async (req, res) => {
	try {
		const schema = {
			name: Joi.array().items(),
			order: Joi.string().required(),
			discoount: Joi.number().required(),
			required: Joi.number().required(),
			residual: Joi.number().required(),
		}
		const result = Joi.validate(req.body, schema);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		const table = await Table.findById(req.params.id).populate("order");
		if (!table) return res.status(404).send(`Not find this table`);
		const orders = new Order({
			name: [{
				"order": req.body.order
			}],
			discoount: req.body.discoount,
			required: req.body.required,
			residual: req.body.residual,
			table_id: req.params.id
		});

		orders.table = table;
		await orders.save();
		res.send(orders)

		table.order.push(orders);
		await table.save();
	} catch (err) {
		res.status(500).send(err.message);
	};
});



module.exports = router;