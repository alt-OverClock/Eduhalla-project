var score=0;
var hero= {
    top:500,
    left:250
};
var missiles=[];
var enemies=[
    {left:50, top:50},
    {left:200, top:50},
    {left:350, top:50},
    {left:500, top:50}
];
let shuffled , current ;
const questions =[
    {
      
         question:"What is sin30degrees?",
         answers:[
              {  text:'1/4', correct: false},
              { text:'1/3',correct: false},
              { text:'1/2',correct:true},
              {text:'1/5',correct :false}
             
         ]
        }
]
const questiondiv = document.getElementById("question");
const answerbuttons =document.getElementById("answer-btns")
const startbutton = document.getElementById("start")
const qcont = document.getElementById("q-cont")
const nextbutton = document.getElementById('next')
const result=document.getElementsByClassName('correct');
start.addEventListener('click',startgame)
nextbutton.addEventListener('click',()=>{
    current++;
    setnextquestion();
    startLoop1();
})

function startgame(){
    console.log("started")
    startLoop();
    start.classList.add('hide');
    shuffled=questions.sort(()=>Math.random()-.5)
    current =0 ; 
    qcont.classList.remove('hide');
    
    setnextquestion();
}
function setnextquestion(){
    resetstate();
   
    showquestion(shuffled[current])

}
function showquestion(question){
   questiondiv.innerText= question.question
   question.answers.forEach(answer=>{
       const button=document.createElement('button')
       button.innerText=answer.text;
       button.classList.add('btn')
       answerbuttons.appendChild(button);
   })
}
function resetstate(){
 nextbutton.classList.add('hide');
 while(answerbuttons.firstChild)
 {
     answerbuttons.removeChild(answerbuttons.firstChild)
 }
}
//reaction to key pressess

document.onkeydown=function(e){
    if(e.key==="ArrowLeft"){
      
        hero.left=hero.left-10;
        movehero();
    }
    else if (e.key==="ArrowRight"){
    
        hero.left=hero.left+10;
        movehero();

    }
    else if(e.key==="ArrowUp"){
    
     missiles.push(
         {
             left:hero.left+5,
             top:hero.top
         }
     )
     drawmissile();
     }
     }
var keepGoing = true;
 function myLoop() {
      movenenemy();
      drawenemies();
        if(keepGoing) {
            setTimeout(myLoop, 100);
        }
    }
     function startLoop() {
        keepGoing = true;
        myLoop();
    }
      function stopLoop() {
        keepGoing = false;
    }
function startLoop1(){
    
    console.log("fd");
    for( var enemy =0 ; enemy<enemies.length;enemy++){
           if(enemies[enemy].top>=hero.top-50){
                 console.log("jbbjhb");
                 enemies[enemy].top=50;
                    }
         }
            startLoop();
        }
function movehero(){
  document.getElementById("hero").style.left=hero.left+"px";
}
movehero();
function drawmissile(){
    document.getElementById("missiles").innerHTML="";
    for(var i=0 ; i<missiles.length;i ++)
        {
            document.getElementById("missiles").innerHTML+=`<div class="missile" 
            style='left:${ missiles[i].left}px ; top:${missiles[i].top}px;'></div>`
         }
}
function movemissile(){
    for(var i=0 ; i<missiles.length;i ++)
    {
       missiles[i].top -= 5;
    }
}

function drawenemies(){
    document.getElementById("enemies").innerHTML="";
    for(var enemy =0 ; enemy<enemies.length;enemy++)
        {
            document.getElementById("enemies").innerHTML+=`<div class="enemy" 
            style='left:${enemies[enemy].left}px ; top:${enemies[enemy].top}px;'></div>`
         }
}
function movenenemy(){
    for(var enemy=0 ; enemy<enemies.length;enemy++)
    {
       enemies[enemy].top =enemies[enemy].top+ 2;
    }
}
function detection(){
    for(var enemy=0 ; enemy<enemies.length ; enemy++)
    {
        for(var i=0 ; i<missiles.length;i ++)
        {
         if( 
             ( missiles[i].top<=enemies[enemy].top+50 )&& 
             (missiles[i].top>=enemies[enemy].top)&&
             (missiles[i].left<=enemies[enemy].left+50)&&
             (missiles[i].left>=enemies[enemy].left)
          )
         {
             enemies.splice(enemy , 1 );
             missiles.splice(i , 1);
             stopLoop();
             nextbutton.innerHTML="WrongAnswer";
             nextbutton.classList.remove('hide');
             if( (enemies[enemy].left==500))
             { 
                 console.log("correct");
              nextbutton.innerHTML="Good Job!"
             }
             
         }
         
        }
    }
    for( var enemy =0 ; enemy<enemies.length;enemy++){
    
        if(enemies[enemy].top>=hero.top-50){
            console.log("timeup");
            document.getElementById('start').innerHTML="Timeup";
            nextbutton.classList.remove('hide');
            stopLoop();
           break;
        }
        
    }

}
function gameLoop(){
  
    setTimeout( gameLoop ,10);
    movemissile();
    drawmissile();
    detection();
 }gameLoop();

