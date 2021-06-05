const mongoose = require('mongoose');

var PostReportReasonSchema = mongoose.Schema({    
	reason: String,
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});

module.exports = mongoose.model('post_report_reason', PostReportReasonSchema);