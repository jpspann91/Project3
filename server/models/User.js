const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 4,
    maxLength: 15
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
  firstName: {
    type: String,
    minLength: 1,
    maxLength: 15,
    required: true
  },
  lastName: {
    type: String,
    minLength: 1,
    maxLength: 15,
    required: true
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
