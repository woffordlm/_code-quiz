
// Initial setup of global variables
var startButtonEl = document.getElementById("start-button");
var mainEl = document.getElementById("page-content");
var choiceList = document.getElementById("choice-list");
var questionindex = 0
var wrappperEl = document.getElementById("prompt-wrapper-id");
var validationEl = document.createElement("div");
var questionEl = document.getElementById("question-place-id");
var scoreLinkEl = document.getElementById("score-link");
// these variables set the timer and player score
var timeLeft = 60;
var score = 0
// thi variable acts the storage for all of the question, choices, and answers
var questions = [
    {
        title: "Which answer displays the proper way to add a class name to an element? ",
        choices: ["buttonEl.className = 'answer-button'", "buttonEl+className = 'answer-button'", "buttonEl.class = 'answer-button'", "buttonEl.addclassName = 'answer-button'"],
        answer: "buttonEl.className = 'answer-button'"
    },
    {
        title: "In order to pull data from local storage, one must do what to the data in order to use it. ",
        choices: ["use JSON.stringify","use parse", "nothing", "stringify and parse"],
        answer: "use parse"
    },
    {
        title: "Javascript provides the skeleton and styling to a webpage. True or False",
        choices: ["True","False"],
        answer: "False"
    },
    {
        title: "How might one access properties from an array of objects?",
        choices: ["arrayname.properties", "arrayname.getproperties", "A or B", "properties.arrayname"],
        answer: "arrayname.properties"
    },
    {
        title: "Jquery is a library that utilizes which of the following languages?",
        choices: ["HTML", "CSS", "Javascript", "All answers"],
        answer: "Javascript"
    }
  ]  ;
// this array is eventually filled out and then pushed to local storage
  var savedScores= []
// this function acts as the countdown timer that is triggered by a click event
function countdown(event) {
    var timerEl = document.getElementById('countdown');
    // this variable will decrease the timer every second until it reaches 0
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timerEl.textContent = 'time: '+ timeLeft;
        timeLeft--;
      } else {
        timerEl.textContent = '';
        // this function stops the timer
        clearInterval(timeInterval);
      }
    }, 1000);
}

// this function is called by the clearScreen function
// thhis funtion cycles through the questions array to display all the questions and answers
function callQuestions(){
        questionEl.textContent = "";
        var quesEl = questions[questionindex].title;
        questionEl.textContent = quesEl;
         var choiceEl = questions[questionindex].choices;
            for (let i = 0; i< choiceEl.length; i++) {
                var listed = document.createElement("li");
                listed.className = "list-item-style"
                listed.setAttribute("data-choice","1");
                var buttonEl = document.createElement("button");
                buttonEl.className = "answer-button";
                buttonEl.textContent = choiceEl[i];
                listed.appendChild(buttonEl);
                choiceList.appendChild(listed); 
            }
}
// this function triggers the end of the game
// when the parameters are meet the screen will display a new stucture and will 
// ask the user to input their initials, this data is then saved in local storage along with the score
// the user has the option to start the quiz again by using the restart button
function endGame(){
    if(timeLeft===0 || questionindex===5){
        // this section clears content form the page and feel it back in with elements
        // instructing the user to fill out the input
        questionEl.innerHTML = "";
        choiceList.innerHTML= "";
        var doneEl = document.createElement("div");
        doneEl.className = "end-game-title"
        doneEl.textContent= "Finished"
        var doneParagraphEl = document.createElement("p");
        doneParagraphEl.className = "end-game-paragraph";
        doneParagraphEl.textContent = "You finished with a score of "+score+" points";
        var inputEl = document.createElement("input");
        inputEl.className = "end-game-input";
        var endGame = document.getElementById("endgame");
        var buttonEl = document.createElement("button");
        buttonEl.className = "end-button";
        var restartEl = document.createElement("button");
        restartEl.textContent = "Restart";
        restartEl.className = "end-button";
        buttonEl.textContent= "Submit"
            
        endGame.appendChild(doneEl);
        endGame.appendChild(doneParagraphEl);
        endGame.appendChild(inputEl);
        endGame.appendChild(buttonEl);
        endGame.appendChild(restartEl);
        timeLeft= 0
        // this event listener is linked to a button that triggers a function
        // to reset the game
        restartEl.addEventListener("click", function(){
            questionindex=0
            timeLeft= 60
            endGame.innerHTML= ""
            callQuestions();
            })
        // This button triggers a function that saves the score and inital to local storage
        buttonEl.addEventListener("click", function(){
            // console.log(score);
            var initials = document.querySelector("input");
            // console.log(initials.value);
            var scoreObject = {
                score: score,
                initials: initials.value
                }
                
            savedScores.push(scoreObject);
            localStorage.setItem("highscores",JSON.stringify(savedScores));       
            })     
    }
    else{
        callQuestions();
    }      
}
// this funtion checks for the correct answers by matching the target button value with the value of 
// the correct answer in the questions array
// a set timer is enabled so that user has time to view if the answer was correct before moving on
// points are added or deducted depending on the answer
// timeLeft is deducted by 10 seconds if the answer is wrong
function validation(event){
            if(event.target.matches("button")){
                    var answerEl= questions[questionindex].answer;
                    var confirmAnswer = event.target.textContent;

                    if(answerEl === confirmAnswer){
                        validationEl.textContent = "CORRECT!";
                        score = score + 1
                
                        wrappperEl.appendChild(validationEl);
                        setTimeout(function(){
                        choiceList.innerHTML= ""
                        wrappperEl.removeChild(validationEl)
                        questionEl.textContent=""
                        questionindex++
                        endGame();
                        },1000)
                    }

                    else if(answerEl !== confirmAnswer)  {
                        validationEl.textContent = "WRONG!";
                        score = score-1
                        timeLeft= timeLeft-10
                        wrappperEl.appendChild(validationEl);
                        setTimeout(function(){
                         choiceList.innerHTML= "";
                        wrappperEl.removeChild(validationEl)
                        questionEl.textContent=""
                        questionindex++
                        endGame();
                        },1000)      
            } 
        } 
}
// this function clears the inital screen making way for the question and answer elements
function clearScreen(){
     // remove paragraph
     var paragraph = document.getElementById("initial-p");
     wrappperEl.removeChild(paragraph);
     
     // paragraph.remove();
     var starterButton = document.getElementById("start-button");
     wrappperEl.removeChild(starterButton);
     // starterButton.remove();
     // remove initial title
     var titleEl = document.getElementById("initial-title-id");
     wrappperEl.removeChild(titleEl);
    //  start timer
    countdown();
    callQuestions();
 
}

choiceList.addEventListener("click",validation);
startButtonEl.addEventListener("click",clearScreen);





    


   


  
 