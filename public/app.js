/**
 * function that is invoked when the login button is called, handles both login and signout
 */
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const loginButton = document.getElementById("login");

    // check whether signed in or out
    if (loginButton.innerHTML === "Sign Out") {
        firebase.auth().signOut()
            .then(() => { // change button to sign in
                loginButton.innerHTML = "Sign in with Google";
            });
    } else {
        firebase.auth().signInWithPopup(provider)
            .then(() => { // change button to sign out and format text
                loginButton.innerHTML = "Sign Out";
                alignText();
            });
    }
}

/**
 * submits text to the firestore database
 */
function submitText() {
    let user = firebase.auth().currentUser;

    // check if the user is signed in
    if (user === null) {
        alert("Please sign in before messaging");
        return;
    }

    const text = document.getElementById("text").value;
    let messageData = { // format message data
        data: {
            text: text,
            userID: user.uid
        }
    }

    // make a POST request using the addMessage endpoint
    fetch("https://us-central1-quantumbot-core1.cloudfunctions.net/addMessage", {
        method: "POST",
        body: JSON.stringify(messageData),
        headers: {
            "Content-type": "application/json"
        },
    });
}

/**
 * pre: firebase.auth().currentUser !== null
 * adds or removes "outgoing" to the css of html messages based on if the user sent the message or not
 */
function alignText() {
    let user = firebase.auth().currentUser;
    let items = document.getElementById("textfield").children;

    // remove or add "outgoing" based on the user id's
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains(user.uid)) items[i].classList.add("outgoing");
        else items[i].classList.remove("outgoing");
    }
}

// listens to the firestore database to check for message submissions, and updates the webpage as necessary
document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore();
    const messages = db.collection("messages").orderBy("timestamp", "desc").limit(17); // only display the most recent messages

    messages.onSnapshot(snapshot => {
        // go through each message
        snapshot.docChanges().reverse().forEach((change) => {
            if (change.type == "added") { // look only at documents that are different
                let user = firebase.auth().currentUser;
                let data = change.doc.data();
                
                // create a new message to add to webpage
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(data.text));
                li.classList.add(data.userID);
                if (user !== null && data.userID === user.uid) li.classList.add("outgoing");
                else li.classList.remove("outgoing");

                // add message
                document.getElementById("textfield").appendChild(li);
            }
        });
    });
});