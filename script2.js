 // Initializing Firebase
 var config = {
    apiKey: "AIzaSyCl7iIWbC_qqmBxfoRT-nj0WT7bFllMwDE",
    authDomain: "rps-game-7aec3.firebaseapp.com",
    databaseURL: "https://rps-game-7aec3.firebaseio.com",
    projectId: "rps-game-7aec3",
    storageBucket: "rps-game-7aec3.appspot.com",
    messagingSenderId: "773687441552"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


//   connecting users
var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");
// Number of online users is the number of objects in the presence list.

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snapshot) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
//   console.log(snapshot.connections.uid);
  $(".displayDiv").text(snapshot.numChildren());
//   var childKey = snapshot.child("/connectedRef").key;
//   console.log(childKey);
});

var nameRef = firebase.database().ref(".info/connections");
var key = nameRef.key;  // key === "ada"
key = nameRef.child("name/last").key; 
console.log("name is :"+nameRef+"" + key)

var player1Answer;
var player2Answer;


$("#r1").attr("data-value","r");
$("#p1").attr("data-value","p");
$("#s1").attr("data-value","s")

$(".gamesect >button").on("click", function(){
console.log("working");
player1Answer = $(this).attr("data-value");
console.log(player1Answer);
if(player1Answer==="r"){
$(".displayDiv").addClass("far fa-hand-rock")
}
else if(player1Answer==="p"){
    $(".displayDiv").addClass("far fa-hand-paper")  
}
});
