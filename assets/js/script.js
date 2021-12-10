var startButtonEl = document.getElementById("start-button");
var mainEl = document.getElementById("page-content");
var choiceList = document.getElementById("choice-list");
var questionindex = 0
var wrappperEl = document.getElementById("prompt-wrapper-id");
var validationEl = document.createElement("div");
var questionEl = document.getElementById("question-place-id");
var timeLeft = 60;
var score = 0
var scoreLinkEl = document.getElementById("score-link");
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
var savedScores= []

function countdown(event) {
    var timerEl = document.getElementById('countdown');
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft >= 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'time: '+ timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
      }
    }, 1000);
}
function callQuestions(){
       // initially populate question field
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
function endGame(){
    if(timeLeft===0 || questionindex===5){
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

            restartEl.addEventListener("click", function(){
                questionindex=0
                timeLeft= 60
                endGame.innerHTML= ""
                callQuestions();
            })


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
                        },2000)
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
                        },2000)
    
                
            }
          
        } 
     
    
    
}
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





    


   


  
 