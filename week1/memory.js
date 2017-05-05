var cards;
var speelveld;
var matchStarted = false;
var openCards = [null, null];
var found = 0;
var top5 = [];
var top5Display;

function initGame() {
    speelveld = document.getElementById("speelveld");
    makeTop5();
    cards = [];
    var characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R"];
    for (i=35;i>=0;i--){
        var rand = Math.floor((Math.random() * i));
        var element = makeCard(characters.splice(rand, 1));
        cards.push(element);
    }
    var td = document.createElement("tr");
    var node = document.createTextNode("");
    for(i=0;i<36;i++){
        if (i % 6 === 0 && i !== 0){
            speelveld.appendChild(td);
            td = document.createElement("tr");
        }
        td.appendChild(cards[i]);
    }
    speelveld.appendChild(td);
    // startMatchTimer();
}

function makeCard(char) {
    var r = document.createElement("td");
    var node = document.createTextNode(char);
    r.appendChild(node);
    r.className = "inactive";

    r.addEventListener("click", function(){
        cardListener(this);
    });
    return r;
}

function cardListener(card){
    var current = card.className;

    if (current === "found" || openCards[1] !== null) return;
    if (matchStarted === false) startMatchTimer();

    if (current === "inactive" ){
        if (openCards[0] === null){
            card.className = "active";
            openCards[0] = card;
            startMoveTimer();
        }else if (openCards[0].innerHTML === card.innerHTML){
            openCards[0].className = "found";
            card.className = "found";
            stopMoveTimer();
            found++;
            $("#gevonden").text(found);
            if (found === 2){
                gameEnd();
            }
        }else {
            card.className = "active";
            openCards[1] = card;
        }

    }else {
        card.className = "inactive";
    }
}

function gameEnd() {
    clearInterval(matchTime);
    var user = prompt("Please enter your name");
    if (user !== null){
        if (top5.length < 5){
            var item = [user, matchTime];
            top5.push(item);
        }
    }
    sortTop();
    updateTop5Display();
}

function makeTop5() {
    top5Display = [];
    var ol = document.getElementById("topscores");
    for (i = 0; i < 5; i++){
        var li = document.createElement("li");
        var node = document.createTextNode("");
        li.appendChild(node);
        ol.appendChild(li);
        top5Display.push(li);
    }



}

function updateTop5Display() {
    for (i = 0; i < top5.length; i++){
        top5Display[i].innerHTML = top5[i][0] + " - " + timeString(top5[i][1]);
    }
}

//uses bubble sort
function sortTop(){
    for (i = top5.length - 1; i >= 0; i--){
        for (j = 0; j < i; j++){
            if (top5[j][1] > top5[j+1][1]){
                var temp = top5[j];
                top5[j] = top5[j+1];
                top5[j+1] = temp;
            }
        }
    }
}

//Timer stuff
var matchTime = 0;
var matchTimer;
var moveTime;
var moveTimer;
function startMatchTimer(){
    matchStarted = true;
    matchTimer = setInterval(function () {
        matchTime++;
        $("#tijd").text(timeString(matchTime));
    }, 1000);
}

function startMoveTimer(){
    moveTime = 8;
    $("#timeLeft").text(timeString(moveTime));
    moveTimer = setInterval(function () {
        moveInterval();
    }, 1000)
}

function stopMoveTimer() {
    $("#timeLeft").text("");
    clearInterval(moveTimer);
    openCards[0] = null;
    openCards[1] = null;
}

function moveInterval(){
    moveTime--;
    $("#timeLeft").text(timeString(moveTime));
    if (moveTime === 0) {
        openCards[0].className = "inactive";
        if (openCards[1] !== null) {
            openCards[1].className = "inactive";
        }
        stopMoveTimer();
    }
}

function timeString(seconds){
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    var mid = sec < 10 ? ":0" : ":";
    var str = min + mid + sec;
    return str;
}

//setting colors
function getStyleRule(name) {
    for(var i=0; i<document.styleSheets.length; i++) {
        var ix, sheet = document.styleSheets[i];
        for (ix=0; ix<sheet.cssRules.length; ix++) {
            if (sheet.cssRules[ix].selectorText === name)
                return sheet.cssRules[ix].style;
        }
    }
    return null;
}

// $("#styleInactive").addEventListener("change")

function changeColorInactive() {
    getStyleRule("td.inactive").backgroundColor = $("#valueinactive").value;
}
function changeColorActive() {
    getStyleRule("td.inactive").backgroundColor = $("#valueactive").text;
}
function changeColorFound() {
    getStyleRule("td.inactive").backgroundColor = $("#valuefound").text;
}