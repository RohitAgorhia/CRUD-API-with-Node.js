const mongoose = require('mongoose');
var ReportSchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true},  	
    message: String,
    username: String,
    profile_pic: String,    
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('report', ReportSchema);