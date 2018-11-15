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

  var playerId;
  var wins1 = 0;
  var loss1 = 0;
  var wins2 = 0;
  var loss2 = 0;
  var playerArray= [];

  var database = firebase.database();
// working on the ref method
  var ref = database.ref('/players')
  console.log("ref is"+ref);

  var playersRef = ref.child('players');
  var playerskey = playersRef.key();
  console.log("hopefully the players key  "+ playersRef.key());


//   connecting users
var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");
// Number of online users is the number of objects in the presence list.

// When the client's connection state changes...
connectedRef.on("value", function(snapshot) {

  // If they are connected..
  if (snapshot.val()) {

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
  console.log("numers of players are:"+ snapshot.numChildren());

//   console.log("might be happening"+snapshot.child.key())

  $(".displayDiv").html(snapshot.numChildren());

//   if(snapshot.numChildren()===1){
//     playerId = "player1";
//   }
//   else if(snapshot.numChildren()===2){
//       playerId ="player2"
//   }
//   else {
//       playerId = "not a player"
//   }
//   console.log("player id is"+ playerId);
});

database.ref('/recent-players').child('activeplayers').set('0')

$("#add-user").on("click",function(event){
event.preventDefault();

var name = $("#name-input").val();
playerArray.push(name);
console.log("the array "+playerArray)


database.ref('/recent-players').push({
    databaseName: name,
    databaseplayerId: playerId, 
    databaseWins1: wins1,
    databaseLoss1: loss1
    
   }).then(function(){
     console.log("saved for 1");

     database.ref('/recent-players').child('activeplayers').set('1')
     
   })
   console.log("saved for player1");





});

database.ref("/recent-players").on("value", function(snapshot) {
    var databaseObject = snapshot.val();
    console.log("child parameter "+snapshot.child("activeplayers").val())
    if (snapshot.child("activeplayers").val()==='0') {

        // Set the local variables for highBidder equal to the stored values in firebase.
        // playerId = snapshot.val().databaseName;

        playerId = "player1"
        console.log("its working" + playerId)
        
        // change the HTML to reflect the newly updated local values (most recent information from firebase)
        // $(".displayDiv").text(databaseObject.databaseName);
    
        // // Print the local data to the console.
        // console.log(databaseObject.databaseName);
        
      }
    
     
      else {

        playerId = "player2"
    
        // Print the local data to the console.
        console.log("its working" + playerId)
       
      }

 console.log(playerId)
});

var userAnswer;
var player1Answer;
var player2Answer;
var scorePlayer1 = 0;
var scorePlayer2 =0;

//  to generate player answers
function genPlayerAnswer(){
    if(playerId==="player1"){
         player1Answer = userAnswer;
    }
    else if(playerId ==="player2"){
        player2Answer = userAnswer;
    }
    else {
        $(".displayDiv").text("wait for your turn") 
    }
}

//  to check logic for winning
function decideGame(player1Answer,player2Answer){
   if(!(player1Answer&&player2Answer)===0){
    if((player2Answer==="r"&&player1Answer==="p")||(player2Answer==="p"&&player1Answer==="s")||(player2Answer==="s"&&player1Answer==="r")) {
        alert("player1 wins")
        scorePlayer1++;
    }

    else if ((player1Answer==="r"&&player2Answer==="p")||(player1Answer==="p"&&player2Answer==="s")||(player1Answer==="s"&&player2Answer==="r")) {
        alert("player2 wins")
        scorePlayer2++
    }
    else {
        player1Answer===player2Answer;
        alert("Its a tie");
        
    }
}
else {
    console.log("2 makes a team")
}
}

// setting values for rps and then gerating them on clicking

$("#r1").attr("data-value","r");
$("#p1").attr("data-value","p");
$("#s1").attr("data-value","s")

$(".gamesect >button").on("click", function(){
console.log("working");
userAnswer = $(this).attr("data-value");

genPlayerAnswer();
console.log(player1Answer);
console.log(player2Answer);
decideGame(player1Answer,player2Answer);
// if(player1Answer==="r"){
// $(".displayDiv").addClass("far fa-hand-rock")
// }
// else if(player1Answer==="p"){
//     $(".displayDiv").addClass("far fa-hand-paper")  
// }
});
