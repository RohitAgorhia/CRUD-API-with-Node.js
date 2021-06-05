const mongoose = require('mongoose');
var HistorySchema = mongoose.Schema({ 
    user_id: { type: mongoose.Schema.ObjectId, required: true}, 
    redirect_id: { type: mongoose.Schema.ObjectId, required: true},	 
    message: String,  
    status:{ type:Object,default:''},  
    show:{ type:Object,default:'false'},
    post_image:{ type:Object,default:''},
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('history', HistorySchema);