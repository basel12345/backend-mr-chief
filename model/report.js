const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ReportSchema = new Schema({
	order: {
		type: Array,
		required: true
	},
	discoount: {
		type: Number,
		required: true
	},
	required: {
		type: Number,
		required: true
	},
	residual: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date().getTime()
	},
	billNumber: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	pay: {
		type: Number,
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	},
	table_id: {
		type: String,
		required: true
	},
	table: {
		type: Schema.Types.ObjectId,
		ref: 'Table'
	}
});

const Report = mongoose.model("Report",ReportSchema);

module.exports = Report;