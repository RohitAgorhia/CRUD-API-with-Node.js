const mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var UserSchema = mongoose.Schema({ 
    name:String, 
    lastname:String,   
	email:{ type:Object,default:''}, 
	password:String,
	country:String,
    token:String,
    otp:String,
    profile: { type:Object,default:'profile/avatar.png'},
    block: { type:Object,default:0},  
    version:{ type:Object,default:0},  
    signup_type:{ type:Object,default:'app'},    
	verify:{ type:Object,default:'false'}, 
	privacy:{ type:Object,default:'private'},     
    time:{type: Number, default: Date.now},
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    var user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
            });
    });
});  

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('users', UserSchema);