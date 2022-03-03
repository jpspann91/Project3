const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
  online: {
    type: Boolean,
    deafult: false
  },
  icon: {
    type: String, 
    minLength: 2,
  },
  fullName: {
    type: String,
    minLength: 2,
    required: false
  },
  activeMatches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Match'
    }
  ],
  pastMatches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Match'
    }
  ]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
