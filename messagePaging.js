const sendMessage = (message, msgToSend) => {
  message.reply(msgToSend, { split: true });
  // console.log('msg length', msgToSend.length);
  // if (msgToSend.length >= 1594) {
  //   const partialMsg = msgToSend.substring(0, 1595);
  //   message.reply(partialMsg);
  //   return sendMessage(message, msgToSend.substring(1595));
  // }
  // return message.reply(msgToSend);
};

module.exports = {
  sendMessage,
};
