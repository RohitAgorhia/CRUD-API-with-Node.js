const mongoose = require('mongoose');
var LikeSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, required: true},
    post_id: { type: mongoose.Schema.ObjectId, required: true},
    time:{type: Number, default: Date.now},        
}, {
    timestamps: true
});
module.exports = mongoose.model('like',LikeSchema);