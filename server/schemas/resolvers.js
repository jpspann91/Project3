const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('friends');
    },
    games: async () => {
      return Game.find().populate('players')
    },
    game: async (parent, { gameId }) => {
      return Game.findOne({ gameId }).populate('players')
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('friends');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addFriend: async (parent, { userId }, context) => {
      if (context.user) {
        const friendToAdd = await User.findOne({ userId })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendToAdd._id } },
          { new: true, runValidators: true }
        );

        return friendToAdd
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFriend: async (parent, { userId }, context) => {
      if (context.user) {
        const friendToRemove = await User.findOne({ userId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendToRemove._id } },
          { new: true }
        )

        return friendToRemove
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
