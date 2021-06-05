const mongoose = require('mongoose');
var FlameSchema = mongoose.Schema({ 
    post:Number,  
    like:Number,  
    comment: Number,    
    reaction:Number,  
    share: Number,
    score: Number,
    follow: Number,
    report: Number,
    reply: Number,
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});
module.exports = mongoose.model('flame', FlameSchema);