const mongoose = require('mongoose');
var CommentSchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true},   
    post_id: { type: mongoose.Schema.ObjectId, required: true},	
    reply_count:{ type:Object,default:0},  
    comment: String,    
    username: String,
    profile_pic: String,    
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('comment', CommentSchema);