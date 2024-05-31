const Message = require("../models/messageSession");
const User = require("../models/user");
const io = require("../socket");
const Product = require("../models/product");

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

exports.deleteMessageSession = (req, res, next) => {
  const clientIdChat = req.body.clientMessageId;

  console.log("clientIdChat:", clientIdChat);

  if (!clientIdChat) {
    res.status(403).json({
      message: "Cannot find this id!",
    });
    return;
  }

  Message.findOneAndDelete({ userId: clientIdChat })
    .then((result) => {
      io.getIo().emit("posts", {
        action: "deleteMessageSession",
        theSession: result,
      });
      res.status(201).json({
        message: "Delete the message session complete!",
      });
    })
    .catch((err) => {
      console.log("err Message.findOne deleteMessageSession:", err);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

exports.clientAddToCart = (req, res, next) => {
  const productIdAddCart = req.body.productIdAddCart;
  const numberToCart = req.body.numberToCart;

  console.log("productIdAddCart:", productIdAddCart);
  console.log("numberToCart:", numberToCart);
  console.log("req.userId:", req.userId);

  Product.findById(productIdAddCart)
    .then((product) => {
      if (!product) {
        res.status(404).json({
          message: "The product cannot found!",
        });
        return;
      }
      User.findById(req.userId)
        .then((user) => {
          if (!user) {
            res.status(403).json({
              message: "The user is not exist!",
            });
            return;
          }
          return user.addToCart(product, numberToCart);
        })
        .then((result) => {
          console.log("result user.addToCart:", result);
          res.status(201).json({
            message: "Add to cart successfully!",
          });
        })
        .catch((err) => {
          console.log("err User.findById clientAddToCart:", err);
          res.status(500).json({
            message: "Something went wrong! Cannot add to cart now!",
          });
        });
    })
    .catch((err) => {
      console.log("err Product.findById clientAddToCart:", err);
      res.status(500).json({
        message: "Something went wrong! Cannot add to cart now!",
      });
    });

  // User.findById(req.userId)
  //   .then((user) => {
  //     if (!user) {
  //       res.status(403).json({
  //         message: "Please login again and trying later!",
  //       });
  //       return;
  //     }
  //     Product.findById(productIdAddCart)
  //       .then((product) => {
  //         console.log("productProduct.findById:", product);
  //         if (!product) {
  //           res.status(404).json({
  //             message: "The product not found! Maybe it be sold out!",
  //           });
  //           return;
  //         }
  //         return user.addToCart(product, numberToCart);
  //       })
  //       .then((result) => {
  //         console.log("result user.addToCart:", result);
  //         res.status(201).json({
  //           message: "Add to cart successfully!",
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("err addToCart Product.findById:", err);
  //         res.status(500).json({
  //           message:
  //             "Something went wrong! Please login again and trying later!",
  //         });
  //       });
  //   })
  //   .catch((err) => {
  //     console.log("err addToCart UserFindId:", err);
  //     res.status(500).json({
  //       message: "Something went wrong when add to cart!",
  //     });
  //   });
};
