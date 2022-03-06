const { User, Game, Match } = require('../models');
const { signToken } = require('../utils/auth');
// const {}
const { AuthenticationError } = require('apollo-server-express');
const { ConnectionStates } = require('mongoose');
// import Auth from '../../client/src/utils/auth'  


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate(['friends', 'activeMatches', 'pastMatches']);
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate(['friends', 'activeMatches', 'pastMatches']);
    },
    games: async () => {
      return Game.find();
    },
    game: async (parent, { gameId }) => {
      return Game.findOne({ gameId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(['friends', 'activeMatches', 'pastMatches']);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    matches: async (parent) => {
      return await Match.find().populate(['game', 'winner','activePlayer','players'])
    },
    match: async (parent, {matchId}) => {
      return Match.findById(matchId).populate(['game', 'winner','activePlayer','players'])
    }
  },
  //USER MUTATIONS ***************************
  Mutation: {
    addUser: async (parent, {params}) => {

      const extractedParams = JSON.parse(params);

      const user = await User.create(extractedParams);

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

      await User.findOneAndUpdate(
        {_id: user._id},
        {$set: {online: true}},
        {new: true});

      return { token, user };
    },
    logout: async (parent, { userId }) => {
      request = await userId.context["request"]
      
      if (request.user.is_authenticated){
         
      auth.logout(request)
          
          return True}
      
      return False
    },
    addFriend: async (parent, { userId }, context) => {
      if (context.user) {
        const friendToAdd = await User.findOne({ _id: userId })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: userId } },
          { new: true, runValidators: true }
        );
          console.log(friendToAdd)
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
    },
    // updateUsername: async (parent, { userId }, context) => {
    //   if (context.user) {
    //     const usernameToUpdate = await User.findOne({ _id: userId });
    //     const newName = ''

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $rename: { userername: usernameToUpdate.newName }},
    //       { new: true }
    //     )

    //     return usernameToUpdate 
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    //  },
    // updateEmail: async (parent, { userId }, context) => {
    //   if(context.user) {
    //     const emailToUpdate = await User.findOne({ userId });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: {email: emailToUpdate._id }},
    //       { new: true }
    //     )

    //     return emailToUpdate 
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // updatePassword: async (parent, { userId }, context) => {
    //   if(context.user) {
    //     const passwordToUpdate = await User.findOne({ userId });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: {passord: passwordToUpdate._id }},
    //       { new: true }
    //     )

    //     return passwordToUpdate
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    updateOnline: async (parent, { userId, online }, context) => {
      if(userId) {
        const onlineToUpdate = await User.findById( userId );

        await User.findOneAndUpdate(
          { _id: onlineToUpdate._id },
          { $set: { online }},
          { new: true }
        )

        return onlineToUpdate
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateIcon: async (parent, { userId, icon }, context) => {
      if(userId) {
        const iconToUpdate = await User.findById( userId );

        await User.findOneAndUpdate(
          { _id: iconToUpdate._id },
          { $set: {icon: icon }},
          { new: true }
        )

        return iconToUpdate
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    // updateFullName: async (parent, { userId }, context) => {
    //   if(context.user) {
    //     const fullNameToUpdate = await User.findOne({ userId });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: {icon: fullNameToUpdate._id }},
    //       { new: true }
    //     )

    //     return fullNameToUpdate
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },
    removeActiveMatches: async (parent, { userId, activeMatches }, context) => {
      if(userId) {
        const removeMatchesToUpdate = await User.findOne(userId);

        await User.updateOne(
          { _id: removeMatchesToUpdate._id },
          { $pull: {activeMatches: { _id: removeMatchesToUpdate._id } }},
          { new: true }
        )
        
        return removeMatchesToUpdate
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addActiveMatches: async (parent, { userId, activeMatches }, context) => {
      if(userId) {
        const addMatchesToUpdate = await User.findById( userId );

        await User.updateOne(
          { _id: addMatchesToUpdate._id },
          { $addToSet: {activeMatches: { _id: addMatchesToUpdate._id } }},
          { new: true }
        )
        
        return addMatchesToUpdate
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    



    //GAME MUTATIONS ******************
    addGame: async (parent, {gameType, ruleSet}) => {
      const game = await Game.create({gameType, ruleSet})

      return game
    },
    updateGameType: async(parent, {gameId, gameType}) =>{
      const gameToUpdate = await Game.findById({gameId})
      
      await Game.updateOne(
        {_id: matchToUpdate._id},
        {$set: {gameType: {gameType}}},
        {new: true}
      )
      return gameToUpdate
    },
    updateGameRuleSet: async(parent, {gameId, ruleSet}) =>{
      const gameToUpdate = await Game.findById({gameId})
      
      await Game.updateOne(
        {_id: matchToUpdate._id},
        {$set: {ruleSet: {ruleSet}}},
        {new: true}
      )
      return gameToUpdate
    },

    //MATCH MUTATIONS *********************************
    addMatch: async (parent, { params })=>{ 
      console.log(params);

      const extractedParams = JSON.parse(params);

      console.log(extractedParams)

      const match = await Match.create(extractedParams);

      return match
    },
    updateMatchGame: async (parent, {matchId, gameId}) =>{
      const matchToUpdate = await Match.findById(matchId)
      
      await Match.updateOne(
        {_id: matchToUpdate._id},
        {$set: {game}},
        {new: true}
      )
      return matchToUpdate
    },
    updateMatchStatus: async(parent, {matchId, status}) =>{
      const matchToUpdate = await Match.findById(matchId)
      
      await Match.updateOne(
        {_id: matchToUpdate._id},
        {$set: {status}},
        {new: true}
      )
      return matchToUpdate
    },
    updateMatchWinner: async(parent, {matchId, winner}) =>{
      const matchToUpdate = await Match.findById(matchId)
      const user = await User.findOne({username: winner})

      await Match.findOneAndUpdate(
        {_id: matchToUpdate._id},
        {$set: {winner: user}},
        {new: true}
      )
      return matchToUpdate
    },
    updateMatchScore: async(parent, {matchId, score}) =>{
      const matchToUpdate = await Match.findById(matchId)
      
      await Match.updateOne(
        {_id: matchToUpdate._id},
        {$set: {score}},
        {new: true}
      )
      return matchToUpdate
    },
    updateMatchGameBoard: async(parent, {matchId, gameBoard}) =>{
      const matchToUpdate = await Match.findById(matchId)
      
      await Match.updateOne(
        {_id: matchToUpdate._id},
        {$set: {gameBoard}},
        {new: true}
      )
      return matchToUpdate
    },
    updateMatchActivePlayer: async(parent, {matchId, username}) =>{
      const matchToUpdate = await Match.findById(matchId)
      const user = await User.findOne({username})
      
      await Match.findOneAndUpdate(
        {_id: matchToUpdate._id},
        {$set: {activePlayer: user}},
        {new: true}
      )
      return matchToUpdate
    },
    addMatchPlayer: async(parent, {matchId, userId}) =>{
      const matchToUpdate = await Match.findById(matchId)
      const user = await User.findById(userId);
      
      await Match.findOneAndUpdate(
        {_id: matchToUpdate._id},
        {$addToSet: {players: {...user}}},
        {new: true}
      )
      return matchToUpdate
    },
    removeMatchPlayer: async(parent, {matchId, userId}) =>{
      const matchToUpdate = await Match.findById(matchId)
      const user = await User.findById(userId);
      
      await Match.findOneAndUpdate(
        {_id: matchToUpdate._id},
        {$pull: {players: {_id: user._id}}},
        {new: true}
      )
      return matchToUpdate
    },


  },

};

module.exports = resolvers;
