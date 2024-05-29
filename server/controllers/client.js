const Message = require("../models/messageSession");
const User = require("../models/user");

exports.addMessage = (req, res, next) => {
  const currentMessage = req.body.currentMessage;

  console.log("currentMessage:", currentMessage);

  Message.findOne({ userId: req.userId })
    .then((sessionMessage) => {
      if (!sessionMessage) {
        console.log("Have no sessionMessage!");
        User.findById(req.userId)
          .then((user) => {
            const newSessionMessage = new Message({
              userId: req.userId,
              messages: [
                {
                  currentMessage: currentMessage,
                  date: new Date(),
                  userChat: req.userId,
                  userChatType: user.userType,
                },
              ],
            });
            return newSessionMessage.save();
          })
          .then((sessionMessage) => {
            console.log("sessionMessage res:", sessionMessage);
            res.status(201).json(sessionMessage);
          })

          .catch((err) => {
            console.log("err User.findById in Add message:", err);
            res.status(500).json({
              message: err.message,
            });
          });
      } else {
        console.log("sessionMessage:", sessionMessage);
        User.findById(req.userId)
          .then((user) => {
            sessionMessage.messages.push({
              currentMessage: currentMessage,
              date: new Date(),
              userChat: req.userId,
              userChatType: user.userType,
            });
            return sessionMessage.save();
          })
          .then((sessionMessage) => {
            console.log("sessionMessage res:", sessionMessage);
            res.status(201).json(sessionMessage);
          })

          .catch((err) => {
            connsole.log("err User.findById() in AddMessage else:", err);
            res.status(500).json({
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      console.log("err Message.findOne:", err);
      res.status(500).json({
        message: err.message,
      });
    });
};
