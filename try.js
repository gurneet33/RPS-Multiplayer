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

  var playerId = 0;
  var wins1 = 0;
  var loss1 = 0;
  var wins2 = 0;
  var loss2 = 0;
  var playerArray= [];
  var initialClicks = 0;
  var clickCounter = initialClicks;
  var numberOfPlayers;
  var keyId;

  var database = firebase.database();

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
  numberOfPlayers = snapshot.numChildren();
  console.log("animal numbers are: "+ numberOfPlayers)
  // The number of online users is the number of children in the connections list.
  console.log("numers of players are: "+ snapshot.numChildren());
  $(".displayDiv").html(snapshot.numChildren());
});

// database.ref('/recent-players').child('activeplayers').set('0')

// $("#add-user").on("click",function(event){
// event.preventDefault();
// clickCounter++;
// playerId++
// $("#add-user").css("display", "none");

// database.ref('/active-players').set({
//     databaseCounter: clickCounter,
//     databasePlayerId: playerId 
// })

// });

// database.ref('/active-players').on('value',function(snap){
//   var databaseObject = snap.val();
//   console.log("trying number of players "+ databaseObject.databaseCounter )
//   clickCounter = parseInt(databaseObject.databaseCounter)  ;

//   if((databaseObject.databaseCounter ===1)||(databaseObject.databaseCounter ===2)){
//     $(".mainrow").css("display", "block");
//   }
// })


// var ref = database.ref('players')

database.ref('players').child('active-players').push({
    name: "gurneet",
    number: 1
 })

 
// console.log("just ref "+ ref);


// playerRef.push({
//     name: "Pahul",
//     number: 2
// })
// database.ref('players').child('active-players').child('-LROUchd7V2rYvICHt17').child('name').transaction(function(currentno){
//     return currentno+1;
// });
// console.log("wtf"+database.ref('players').child('active-players').child('-LROUchd7V2rYvICHt17').child('name').set('crazy'))

// database.ref('players').on('child_added',function(data, prevChildKey){
//     var newPlayer = data.val();
//     console.log("name: "+newPlayer.name)
// })

// database.ref('players/').orderByChild("name").on('child_added',function(data){
//     console.log(data.key)
// })

database.ref('connections/').orderByKey().on('child_added',function(data){
         console.log(data.key)
keyId = data.key;
$('.player').text(keyId);
        
     })

   