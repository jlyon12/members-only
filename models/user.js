const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	is_member: { type: Boolean, required: true, default: false },
	is_admin: { type: Boolean, required: true, default: false },
});

UserSchema.virtual('full_name').get(function () {
	return `${this.first_name} ${this.last_name}`;
});
module.exports = mongoose.model('User', UserSchema);
