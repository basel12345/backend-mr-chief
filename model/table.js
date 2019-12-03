const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableSchema = new Schema({
	numberTable: {
		type: Number,
		required: true
	},
	order: [{
		type: Schema.Types.ObjectId,
		ref: 'Order'
	}],
});

const Table = mongoose.model("Table", TableSchema);


module.exports = Table;