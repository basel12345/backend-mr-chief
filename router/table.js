const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Table = require("../model/table");


router.get("/getAllTable", async (req, res) => {
	try {
		const table = await Table.find().populate("order");
		res.send(table);
	} catch (err) {
		res.status(500).send(err.messsage)
	}
});

router.get("/getOneTable/:id", async (req, res) => {
	try {
		const table = await Table.findById(req.params.id).populate("order");
		if (!table) return res.status(404).send(`Not find this table`);
		return res.send(table)
	} catch (err) {
		res.status(500).send(err.message);
	}
});


router.post("/addTable", async (req, res) => {
	try {
		const schema = {
			numberTable: Joi.number().required()
		}

		const result = Joi.validate(req.body,schema);

		if(result.error) {
			res.status(400).send(result.error.details[0].messsage)
		}
		const table = await new Table({
			numberTable: req.body.numberTable
		});
	
		await table.save((err,table) => {
			if (err) {
				res.send({
					status: false,
					message: "Falid to edit the table"
				});
			};
			res.send({
				status: true,
				message: "Table edited",
				table
			});
		})
	} catch (err) {
		res.status(500).send(err.messsage);
	};
});

router.put("/updateStatusTable/:id", async(req,res) => {
	const table = await Table.findByIdAndUpdate(req.params.id, {
		status: req.body.status
	}, { new: true });

	await table.save();
})

module.exports = router;