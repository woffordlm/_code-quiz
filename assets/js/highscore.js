// these global variables pull data from local storage and grab the clear button element
var savedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];
var clearButton = document.getElementById("clear-scores")

// as soon as the page loads this function cycles through the array from local storage and displays them on the page
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
// this funciton allows the user to clear all data in the table by deleting it from local storage
function clearHighScores(event){
    console.log("heyyyy")
    window.localStorage.removeItem("highscores");
    location.reload();
}

// this event listener triggers the clearHighScores function
clearButton.addEventListener("click",clearHighScores);

