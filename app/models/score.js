const mongoose = require('mongoose');
var ScoreSchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true},   
    post_id: { type: mongoose.Schema.ObjectId, required: true},
    score: Number,    
    username: String,
    profile_pic: String,    
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('score', ScoreSchema);