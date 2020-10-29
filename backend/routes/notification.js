const verify = require('../verifytokenmw/verify_mv');
const User = require('../models/User');
const { handlePushTokens } = require('../services/notification');

module.exports = (app) => {
  app.post('/api/notification/token', verify, async (req, res) =>{
    try{
      
      let user = await User.findById(req.user.id);
      user.notificationToken = req.body.token;
      await user.save();
      res.json(user)
    }catch(err){
      console.log('error from notification: ', err.message)
    }
  });

  app.post('/api/notification/send', verify, async (req, res) =>{
    try{
      let user = await User.findById(req.user.id);
      let pushToken = user.notificationToken
      handlePushTokens(pushToken,req.body);
      res.send('notification send');
    }catch(err){
      console.log('error from notification send: ', err.message)
    }
  })
}