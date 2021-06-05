const mongoose = require('mongoose');
var NotificationSchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true}, 
    sender_id: { type: mongoose.Schema.ObjectId, required: true},  
    redirect_id: { type: mongoose.Schema.ObjectId, required: true},	 
    follow_id:String,
    message: String,    
    username: String,
    profile_pic: String,
    status:{ type:Object,default:''},  
    show:{ type:Object,default:'false'},
    post_image:{ type:Object,default:''},
    follow_status:{ type:Object,default:'false'},
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('notification', NotificationSchema);