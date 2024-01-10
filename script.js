const container = document.querySelector('.container');
const questionbox= document.querySelector('.question');
const choicebox= document.querySelector('.choices');
const nextbtn=document.querySelector('.nextbtn');
const scorecard=document.querySelector('.scorecard');
const startbtn=document.querySelector('.startbtn');
const alert=document.querySelector('.alert');
const timer=document.querySelector('.timer');


const quiz=[

    {
        question: "Q.Which of the following methods is used to access HTML elements using Javascript? ",
        choices: ["getElementById","ByClassName","Both Above","None of These"],
        answer: "Both Above"
    },
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }

];  
let currentIndex=0;
let score=1;
let quizOver=false;
let timeLeft=15;
let timerId=null;

const showQuestion=()=>{
   
    const  questionDetails=quiz[currentIndex];

 questionbox.textContent=questionDetails.question;
 let flag=0;
 
 choicebox.textContent="";
 for(let i=0;i<questionDetails.choices.length;i++)
 {
    const currentChoice=questionDetails.choices[i];
    const choiceDiv=document.createElement('div');
    choiceDiv.textContent=currentChoice;
    choiceDiv.classList.add('choice');
    choicebox.appendChild(choiceDiv);
  
    choiceDiv.addEventListener('click',()=>{
      
        if(choiceDiv.classList.contains('selected')&& flag===1)
        {
            choiceDiv.classList.remove('selected');
            flag=0;
        }
        else if(flag===0){
            choiceDiv.classList.add('selected');
            flag=1;
            
        }

        
    })
 }
 if(currentIndex<quiz.length)
 {
    StartTimer();
 }
        
}

const CheckAnswer =()=>{
    const selectedAnswer=document.querySelector('.choice.selected');

    if(selectedAnswer.textContent === quiz[currentIndex].answer)
    {
        displaymsg("Correct Answer");
        score++;
    }
    else{
        displaymsg(`wrong Answer!----- ${quiz[currentIndex].answer} is Correct Answer`);
    }
    timeLeft=15;
    currentIndex++;
    if(currentIndex < quiz.length)
    {
        showQuestion();

    }
    else{
           stopTimer();
           showScore();
    }
}

const showScore=()=>{
    questionbox.textContent="";
    choicebox.textContent="";
    scorecard.textContent=`your Socre is ${score} out of ${quiz.length}`;
    displaymsg('you completed your quiz');
    nextbtn.textContent="Start Again";
    quizOver=true;

}

const displaymsg=(msg)=>{
    const selectedsawal=document.querySelector('.choice.selected');
    alert.style.display="block";
    alert.textContent=msg;

    setTimeout(()=>{
        alert.style.display="none";
    },3000);
}

const StartTimer=()=>{
    clearInterval(timerId);

    timer.textContent=timeLeft;

    const CountDown=()=>{
        timeLeft--;
        timer.textContent=timeLeft;
        if(timeLeft===0)
        {
            const confirmUser= confirm("Time over !!! Want 15 Seconds More");
            if(confirmUser)
            {
                timeLeft=15;
                StartQuiz();
            }
            else{
                stopTimer();
                timeLeft=15;
            startbtn.style.display="block";
            container.style.display="none";

            }
        }



    }
    timerId=setInterval(CountDown,1000);
}
const stopTimer=()=>{
    clearInterval(timerId);
}

const StartQuiz=()=>{

    showQuestion();
}

 nextbtn.addEventListener('click', ()=>{
   const selectedChoice=document.querySelector('.choice.selected');
   if(!selectedChoice && nextbtn.textContent==="Next")
   {
    displaymsg('selcte your Answer');
    return;
   }
   if(quizOver)
   {
       nextbtn.textContent="Next"
       score=0;
       scorecard.textContent="";
       currentIndex=0;
       quizOver=false;
       StartQuiz();
   }
   else{
    CheckAnswer();
   }
    
    

 })
 startbtn.addEventListener('click',()=>{
    container.style.display="block";
    startbtn.style.display="none";
   
    StartQuiz();
   
    CheckAnswer();
 })
console.log("score"+score);


