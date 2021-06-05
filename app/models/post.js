const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true},   
	title: String,
	description:String,
	categories:String,
    privileges: String,
    media: String, 
    thumbnail: { type:Object,default:''}, 
    type: { type:Object,default:'public'},
    views: { type:Object,default:0},  
    score:{ type:Object,default:0},  
    comments:{ type:Object,default:0},  
    likes:{ type:Object,default:0},
    name: String,
    username: String,
    profile_pic: String,  
    follow_status: { type:Object,default:'false'},
    score_status: { type:Object,default:'false'},
    score_user: { type:Object,default:0},
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});

module.exports = mongoose.model('posts', PostSchema);