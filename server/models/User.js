var moongose = require("mongoose");

var User = moongose.model("Users", {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};