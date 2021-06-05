const mongoose = require('mongoose');
var ReplySchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true},   
    post_id: { type: mongoose.Schema.ObjectId, required: true},	
    comment_id: { type: mongoose.Schema.ObjectId, required: true},
    reply: String,
    username: String,
    profile_pic: String,    
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('reply', ReplySchema);