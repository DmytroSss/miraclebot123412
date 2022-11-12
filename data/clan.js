const mongoose = require("mongoose")
const schema = mongoose.Schema({
    userID: String,
    status: {type: String, default: "[ Без статуса ]"},
    balance: {type: Number, default: 0},
    clanVoice: {type: String, default: 0},
    clanText: {type: String, default: 0},
    clanRole: {type: String, default: 0},
    clanName: {type: String, default: "Нет"}
    
})
module.exports = mongoose.model("Clan", schema, "clan")