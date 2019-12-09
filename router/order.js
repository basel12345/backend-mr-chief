const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Order = require("../model/orders");
const Table = require("../model/table");


router.get("/getAllOrder", async (req, res) => {
	try {
		const order = await Order.find().populate("table");
		return res.send(order);
	} catch (err) {
		res.status(500).send(err.message);
	}
});


router.get("/getOneOrder/:id", async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) return res.status(404).send(`Not find this order`);
		return res.send(order)
	} catch (err) {
		res.status(500).send(err.message);
	}
})

// router.post("/addOrder/:id", async (req, res) => {
// 	try {
// 		// const schema = {
// 		// 	name: Joi.array().items(),
// 		// 	order: Joi.string().required(),
// 		// 	discoount: Joi.number().required(),
// 		// 	required: Joi.number().required(),
// 		// 	residual: Joi.number().required(),
// 		// }
// 		// const result = Joi.validate(req.body, schema);
// 		// if (result.error) {
// 		// 	return res.send({
// 		// 		status: false,
// 		// 		message: result.error
// 		// 	});
// 		// }
// 		const table = await Table.findById(req.params.id).populate("order");
// 		if (!table) return res.status(404).send(`Not find this table`);
// 		const orders = new Order({
// 			name: [{
// 				"order": req.body.order
// 			}],
// 			discoount: req.body.discoount,
// 			required: req.body.required,
// 			residual: req.body.residual,
// 			table_id: req.params.id
// 		});

// 		orders.table = table;
// 		await orders.save((err, orders) => {
// 			if (err) {
// 				res.send({
// 					status: false,
// 					message: "Falid to save the orders"
// 				})
// 			};
// 			return res.send({
// 				status: true,
// 				message: "Orders saved",
// 				orders
// 			});
// 		})

// 		table.order.push(orders);
// 		await table.save();
// 	} catch (err) {
// 		res.status(500).send(err.message);
// 	};
// });

router.post("/addOrders/:id", async (req, res) => {
	try {
		const table = await Table.findById(req.params.id).populate("order");
		if (!table) return res.status(404).send(`Not find this table`);
		const orders = new Order({

			order: req.body.order,
			discoount: req.body.discoount,
			required: req.body.required,
			residual: req.body.residual,
			billNumber:req.body.billNumber,
			name:req.body.name,
			createdAt: req.body.createdAt,
			table_id: req.params.id
		});

		orders.table = table;
		await orders.save();
		res.send({
			status: true,
			message: "Order saved",
			orders
		})
		table.order.push(orders);
		await table.save();
	} catch (err) {
		res.status(500).send(err.message);
	};
})


router.delete("/deleteOrder/:id", async (req, res) => {
	try {
		const order = await Order.findOneAndRemove(req.params.id);
		if (!order) return res.status(404).send("Not find this order");

		return res.send({
			sccess: true,
			message: "Order Removed",
		});
	} catch (err) {
		res.status(500).send(err.messsage)
	};
})

module.exports = router;