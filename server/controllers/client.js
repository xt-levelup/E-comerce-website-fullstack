const Message = require("../models/messageSession");
const User = require("../models/user");
const io = require("../socket");

exports.getChatDataClient = (req, res, next) => {
  const userId = req.body.userId;

  console.log("userId getChatDataClient:", userId);

  Message.findOne({ userId: userId })
    .then((messageSession) => {
      res.status(200).json(messageSession);
    })
    .catch((err) => {
      console.log("err getChatClient:", err);
      res.status(500).json({
        message:
          "Something went wrong! You may be login again to resolve this!",
      });
    });
};

exports.addMessage = (req, res, next) => {
  const currentMessage = req.body.currentMessage;
  const userId = req.body.userId;

  console.log("currentMessage:", currentMessage);
  console.log("userId addMessage:", userId);

  // Message.findOne({ userId: req.userId })
  Message.findOne({ userId: userId })
    .then((sessionMessage) => {
      if (!sessionMessage) {
        console.log("Have no sessionMessage!");
        User.findById(userId)
          .then((user) => {
            const newSessionMessage = new Message({
              userId: userId,
              messages: [
                {
                  currentMessage: currentMessage,
                  date: new Date(),
                  userChat: userId,
                  userChatType: user.userType,
                },
              ],
            });
            return newSessionMessage.save();
          })
          .then((sessionMessage) => {
            // console.log("sessionMessage res:", sessionMessage);
            io.getIo().emit("posts", {
              action: "addMessage",
              post: sessionMessage,
            });
            res.status(201).json(sessionMessage);
          })

          .catch((err) => {
            console.log("err User.findById in Add message:", err);
            res.status(500).json({
              message: err.message,
            });
          });
      } else {
        // console.log("sessionMessage:", sessionMessage);
        User.findById(userId)
          .then((user) => {
            sessionMessage.messages.push({
              currentMessage: currentMessage,
              date: new Date(),
              userChat: userId,
              userChatType: user.userType,
            });
            return sessionMessage.save();
          })
          .then((sessionMessage) => {
            io.getIo().emit("posts", {
              action: "addMessage",
              post: sessionMessage,
            });

            // io.getIo().emit("posts", { action: "delete", postDelete: result });
            // console.log("sessionMessage res:", sessionMessage);
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
