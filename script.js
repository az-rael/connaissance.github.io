// Select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const ChoiceA = document.getElementById("A");
const ChoiceB = document.getElementById("B");
const ChoiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");

// Create our questions 
let questions = [
    {
        question : "Qu'est-ce qu'une base de donnée ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "Du code",
        ChoiceB : "une collection d’informations organisées afin d’être facilement consultables, gérables et mises à jour.",
        ChoiceC : "un organisme de standardisation à but non lucratif, fondé en octobre 1994 chargé de promouvoir la compatibilité des technologies du World Wide Web.",
        correct : "B"
    },
    {
        question : "Qu'est-ce qu'un modèle MVC ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "un motif d'architecture logicielle destiné aux interfaces graphiques lancé en 1978 et très populaire pour les applications web. ",
        ChoiceB : "un schéma d’organisation de développement de produits complexes.",
        ChoiceC : "un logiciel de gestion de versions décentralisé.",
        correct : "A"
    },
    {
        question : "Que signifie 'W3C' ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "un organisme de standardisation à but non lucratif, fondé en octobre 1994 chargé de promouvoir la compatibilité des technologies du World Wide Web.",
        ChoiceB : "World Wide Web Coding.",
        ChoiceC : "World Wide Web Consentium.",
        correct : "C"
    },
    {
        question : "Qu'est ce que le 'Test-driven development' ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "une technique de développement qui impose l’écriture de tests avant même l’écriture de la première ligne de code.",
        ChoiceB : "la programmation en binôme.",
        ChoiceC : "Un système de gestion de contenu est indispensable pour construire et enrichir un site internet.",
        correct : "A"
    },
    {
        question : "Que signifie 'CMS' ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "World Wide Web Consentium.",
        ChoiceB : "Système de gestion de contenu.",
        ChoiceC : "Content Management System.",
        correct : "C"
    },
    {
        question : "À quoi sert Git' ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "un organisme de standardisation à but non lucratif, fondé en octobre 1994 chargé de promouvoir la compatibilité des technologies du World Wide Web.",
        ChoiceB : "Il permet ainsi de travailler tout en gardant une trace des modifications apportées successivement, et de retrouver ainsi l'état antérieur de ses données.",
        ChoiceC : "c'est une méthode agile consacrée à la gestion de projet.",
        correct : "B"
    },
    {
        question : "Qu'est-ce que SCRUM' ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "Framework lié aux méthodes agiles de gestion de projet.",
        ChoiceB : "Un langage de programmation.",
        ChoiceC : "Ça n'existe pas.",
        correct : "A"
    },
   
    {
        question : "À quoi sert CMS ?",
        imgSrc : "https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_960_720.jpg",
        ChoiceA : "Un système de gestion de contenu est indispensable pour construire et enrichir un site internet.",
        ChoiceB : "À récolter les données des utilisateurs.",
        ChoiceC : "À styliser les sites web.",
        correct : "A"
    }
];

//Create some variables 

let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
let count = 0;
let TIMER;
let score = 0;
//render a question

function renderQuestion(){
    let q = questions[runningQuestionIndex];

    question.innerHTML ="<p>" + q.question+ "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";  
    ChoiceA.innerHTML = q.ChoiceA;
    ChoiceB.innerHTML = q.ChoiceB;
    ChoiceC.innerHTML = q.ChoiceC;

}

start.addEventListener("click", startQuiz );

//start quiz 
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

//render progress

function renderProgress() {
    for(let qIndex = 0; qIndex <= lastQuestionIndex;qIndex++){
        progress.innerHTML += "<div class='prog' id=" + 
        qIndex + "></div>";
    }
}

// counter render

const questionTime = 10;
const gaugeWidth = 150;
const gaugeProgressUnit = gaugeWidth / questionTime;

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeProgressUnit + "px";
        count++;
    }else {
        count = 0;
        // change progress color to red
        answerIsNotCorrect();
        if (runningQuestionIndex < lastQuestionIndex){
            runningQuestionIndex++;
            renderQuestion();
        }else{ 
            //end quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


//check answer

function checkAnswer (answer){
    if(questions[runningQuestionIndex].correct == answer){
        //Answer is correct
        score++
        //change progress color to green
        answerIsCorrect();
    }else{
        /* Answer is wrong, change progress color to red */
        answerIsNotCorrect();
    }
    count = 0;
    if(runningQuestionIndex < lastQuestionIndex){
        runningQuestionIndex++;
        renderQuestion();
    } else{
        // end quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct

function answerIsCorrect(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "#0f0"
}

// answer is wrong

function answerIsNotCorrect(){
    document.getElementById(runningQuestionIndex).style.backgroundColor = "red";
}

// score render

function scoreRender(){
    scoreContainer.style.display = "block";

    // calculate the amount of question percent anwser bu user
    const scorePercent = Math.round(100 * score / questions.length);
    let img = ( scorePercent >= 80 ) ? "img/5.png" :
              ( scorePercent >= 60 ) ? "img/4.png" :
              ( scorePercent >= 40 ) ? "img/3.png" :
              ( scorePercent >= 20 ) ? "img/2.png" : "img/1.png" ;
    
    scoreContainer.innerHTML = "<img src=" + img + ">";
    scoreContainer.innerHTML = "<p>" + scorePercent + "<%</p>";
            

}


