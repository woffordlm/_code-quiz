var savedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];
var clearButton = document.getElementById("clear-scores")

window.onload = function(){
    for (let i = 0; i < savedHighScores.length; i++) {
        var listedScore = savedHighScores[i].score
        var listedInitial = savedHighScores[i].initials
        console.log(savedHighScores[i].initials)
        var table = document.getElementById("table");
        console.log(table);
        var listedItem = document.createElement("tr");
        listedItem.className = "table";
        listedItem.textContent= listedInitial+"   "+listedScore;
        table.appendChild(listedItem);
    }
}
function clearHighScores(event){
    console.log("heyyyy")
    window.localStorage.removeItem("highscores");
    location.reload();
}
// button not working

clearButton.addEventListener("click",clearHighScores);

