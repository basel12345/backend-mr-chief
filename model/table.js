const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableSchema = new Schema({
	numberTable: {
		type: Number,
		required: true
	},
	status: {
		type: Number,
		default: 1
	},
	order: [{
		type: Schema.Types.ObjectId,
		ref: 'Order'
	}],
	report: [{
		type: Schema.Types.ObjectId,
		ref: 'Report'
	}]
});

const Table = mongoose.model("Table", TableSchema);


module.exports = Table;