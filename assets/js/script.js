var timeLeft = 60;
var mainEl = document.getElementById("mainClass");
var startButtonEl = document.getElementById("starterButton");
var questions = [
    {
        title: "The DOM refers to the ___:",
        choices: ["document", "browser", "window", "local storage"],
        answer: "alerts"
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




function callQuestions(){
    var questionInput = document.getElementById ("questionId")
   
    // clearing questions and choices
    // questionTitle.innerHTML = "";
    // listEl.innerHTML= ""

    // removing paragraph element
    var mainEl = document.getElementById("mainClass");
    var paragraphEl = document.getElementById("initialParaClass");
    paragraphEl.textContent = ""


    // populating questions and choices

    for (var i = 0; i < questions.length; i++) {
        var questionsEl = questions[i].titles;
        var choicesEl = questions[i].choices;
        questionInput.textContent = questionsEl;

        console.log(questionsEl);
        
        
        questionInput.innerHTML = questionsEl;
        var ulContainer = document.getElementById("answerListId");
        var questionsChoices = questions[i].choices;

        for (let i = 0; i < questionsChoices.length; i++) {
            var choicesArray = questionsChoices[i];
            var ulContainer = document.getElementById("answerListId");
            var inputEl = document.createElement("li");
            ulContainer.appendChild(inputEl);
        }
}
}

startButtonEl.addEventListener("click",callQuestions);
