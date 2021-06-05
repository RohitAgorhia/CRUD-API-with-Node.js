const mongoose = require('mongoose');

var FollowSchema = mongoose.Schema({ 
    follower_id: { type: mongoose.Schema.ObjectId, required: true},   
	following_to: { type: mongoose.Schema.ObjectId, required: true},  
    status:{type:Object,default:'pending'},      //pending,accepted
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});

module.exports = mongoose.model('follow', FollowSchema);