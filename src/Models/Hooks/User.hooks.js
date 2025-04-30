const bcrypt = require("bcrypt")

module.exports = {
    applyHooks:(schema)=>{
        schema.pre('save', function(next) {
            const user = this;
            if (!user.isModified('password')) return next();
            user.password = bcrypt.hashSync(user.password, 10);
            next();
        })
    }
}   