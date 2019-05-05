const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// création d'un modèle
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String }
});

userSchema.pre('save', function(next) {
  const user = this;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.isPasswordEqualTo = function(extPassword, done) {
  bcrypt.compare(extPassword, this.password, function(err, isMatch) {
    if (err) {
      done(err);
    }
    done(null, isMatch);
  });
};

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
