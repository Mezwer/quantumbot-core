const admin = require("firebase-admin");
admin.initializeApp();

// import function to add messages
const { addMessage } = require("./api/addMessage");

// export function
exports.addMessage = addMessage;