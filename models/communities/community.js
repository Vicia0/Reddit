const mongoose = require("mongoose");

const CommunityModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    members: {
        type: [String]
    }
});

const community = mongoose.model('community',CommunityModel);

module.exports = community;