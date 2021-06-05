const mongoose = require('mongoose');
var PromoteSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, required: true},
    post_id: { type: mongoose.Schema.ObjectId, required: true},
    flames: String,    
    target: String,    
    age: String,  
    location :String, 
    what_like:String,
    ET_reach:String,
    startDate:String,
    endDate:String,
    status:{type: String, default:'pending'},
    username: String,
    profile_pic: String,    
    time:{type: Number, default: Date.now},        
}, {
    timestamps: true
});
module.exports = mongoose.model('promote',PromoteSchema);