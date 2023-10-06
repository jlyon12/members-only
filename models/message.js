const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true, unique: true },
	timestamp: { type: Date, default: Date.now },
	sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
