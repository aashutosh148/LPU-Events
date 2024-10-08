const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	registrationNo: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
        min: 5,
        max : 20
	},
	role: {
		type: String,
		enum: ["manager", "attendee"],
		default: "attendee"
	},
    eventsRegistered: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ]
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});


module.exports = mongoose.model('User', userSchema);