const mongoose = require('mongoose');
var PlayerSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, required: true},
    device_id:String,
    signup_type:{type: String, default:'Android'},
    time:{type: Number, default: Date.now},        
}, {
    timestamps: true
});
module.exports = mongoose.model('player',PlayerSchema);