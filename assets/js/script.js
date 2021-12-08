var startButtonEl = document.getElementById("start-button");
var mainEl = document.getElementById("page-content");
var choiceList = document.getElementById("choice-list");
var questionindex = 0
var wrappperEl = document.getElementById("prompt-wrapper-id");
var validationEl = document.createElement("div");
var questionEl = document.getElementById("question-place-id");
var timeLeft = 60;
var score = 0
var questions = [
    {
        title: "The DOM refers to the ___:",
        choices: ["document", "browser", "window", "local storage"],
        answer: "document"
    },
    {
        title: "In order to reference an id in your style sheet you must include what symbol:",
        choices: ["#", ".", "/", "-"],
        answer: "#"
    },
    {
        title: "When linking a style sheet to your index, which is in the same directory, it is important to start the path link with",
        choices: ["./","/",".../","//"],
        answer: "/"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Which of the following is utilized in order to manipulate the property of an object?",
        choices: ["a method", "an object", "an <a> tag", "a data attribute"],
        answer: "a method"
    }
  ]  ;


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
                listed.setAttribute("data-choice","1");
                var buttonEl = document.createElement("button");
                buttonEl.textContent = choiceEl[i]
                listed.appendChild(buttonEl);
                choiceList.appendChild(listed); 
            }

}
function endGame(){
    if(timeLeft===0 || questionindex===5){
            questionEl.innerHTML = "";
            choiceList.innerHTML= "";
            var doneEl = document.createElement("div");
            doneEl.textContent= "Finished"
            var doneParagraphEl = document.createElement("p");
            doneParagraphEl.textContent = "You finished with a score of "+score+" points";
            wrappperEl.appendChild(doneEl);
            wrappperEl.appendChild(doneParagraphEl);
            timeLeft= 0
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
    
                // deduct time from timer
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





    


   


  
