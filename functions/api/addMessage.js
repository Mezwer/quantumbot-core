const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { logger } = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
    try {
        logger.log("Received message request data", data);

        // check that fields are correct
        if (!data.text || !data.userID) {
            logger.log("Required fields (text or userID) are missing");
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Required fields (text or userID) are missing"
            );
        }

        // construct the data for message
        const messageData = {
            text: data.text, 
            userID: data.userID,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

        // add users message in firebase
        const messageRef = await admin
            .firestore()
            .collection("chats")
            .doc(userID)
            .collection("messages")
            .add(messageData);
        
        logger.log("Successfully added message, messageID: ", messageRef.id);
        return {status: "success", messageID: messageRef.id};
    } catch (error) {
        logger.error("Error adding message: ", error);

        throw new functions.https.HttpsError("unknown", "Error adding message", error.message);
    }
});