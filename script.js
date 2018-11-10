var player1Answer;
var player2Answer;


$("#r1").attr("data-value","r");
$("#p1").attr("data-value","p");
$("#s1").attr("data-value","s")

$(".gamesect >button").on("click", function(){
console.log("working");
player1Answer = $(this).attr("data-value");
console.log(player1Answer);
});
