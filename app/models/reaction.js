const mongoose = require('mongoose');
var ReactionSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, required: true},
    post_id: { type: mongoose.Schema.ObjectId, required: true},
    comment_id: { type: mongoose.Schema.ObjectId, required: true},
    reaction: String,    
    username: String,
    profile_pic: String,    
    time:{type: Number, default: Date.now},        
}, {
    timestamps: true
});
module.exports = mongoose.model('reaction',ReactionSchema);