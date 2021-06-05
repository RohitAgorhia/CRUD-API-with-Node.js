const mongoose = require('mongoose');

var Postreport = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true},
    post_id: { type: mongoose.Schema.ObjectId, required: true}, 
    report_id:{ type: mongoose.Schema.ObjectId, required: true}, 
    report: String,
    name: String,
    username: String,
    profile_pic: String,	
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});

module.exports = mongoose.model('post_report', Postreport);