const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const MessageSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true, unique: true },
	timestamp: { type: Date, default: Date.now },
	sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

MessageSchema.virtual('timestamp_formatted').get(function () {
	return DateTime.fromJSDate(this.timestamp).toLocaleString(
		DateTime.DATETIME_FULL
	);
});
module.exports = mongoose.model('Message', MessageSchema);
