const sendMessage = (message, msgToSend) => {
  if (msgToSend.length >= 1994) {
    const partialMsg = msgToSend.substring(0, 1995);
    message.reply(partialMsg);
    return sendMessage(message, msgToSend.substring(1995));
  }
  return message.reply(msgToSend);
};

module.exports = {
  sendMessage,
};
