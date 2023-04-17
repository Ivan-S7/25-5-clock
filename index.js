let isSessionMode = true;
let breakSessionLength = 5 * 60;
let sessionLength = 25 * 60;
let sessionTimer;
let breakTimer;
const breakMinusElement = document.getElementById('break-decrement');
const breakSessionElement = document.getElementById('break-length');
const breakPlusElement = document.getElementById('break-increment');
const sessionMinusElement = document.getElementById('session-decrement');
const sessionElement = document.getElementById('session-length');
const sessionPlusElement = document.getElementById('session-increment');
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const playButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');
const TWENTYFIVE_MINUTES = 25*60;
const FIVE_MINUTES = 5*60;
const title = document.getElementById('timer-label')
const beep = document.getElementById('beep');

function updateUITimer(length){
  if(Math.floor(length/ 60).toString().length === 1){
    timerMinutes.textContent = '0' + Math.floor(length/ 60);
    
  }else{
    timerMinutes.textContent = Math.floor(length/ 60);
    
  }

  if ((length%60).toString().length === 1){
    timerSeconds.textContent = '0' + length % 60;
  } else{
    timerSeconds.textContent = length % 60;
  }

}

function startBreak(){
  clearInterval(sessionTimer);
  isSessionMode = false;
  title.textContent = 'Break';
  breakTimer = setInterval(()=>{
    breakSessionLength -=1;
    updateUITimer(breakSessionLength);
    if (breakSessionLength === 0){
      beep.play();
    }

    if(breakSessionLength === 0 - 1){
      
      sessionLength = parseInt(sessionElement.textContent, 10) * 60;
      updateUITimer(sessionLength);
      startSession();
    }
  },1000);
}

function startSession(){
  clearInterval(breakTimer);
  isSessionMode = true;
  title.textContent = 'Session';

  // number +=1
  sessionTimer = setInterval(()=>{
    sessionLength -= 1;
    updateUITimer(sessionLength);

    if(sessionLength === 0){
      beep.play();
    }

    if(sessionLength === 0 - 1 ){
      
      breakSessionLength = parseInt(breakSessionElement.textContent, 10) * 60;
      updateUITimer(breakSessionLength);
      startBreak();
    }
  },1000)
}

// ------------------------------------------------playButton---------------------------------
let number = 0;
playButton.addEventListener('click', ()=>{
  number +=1;

  if(number % 2 == 0 && isSessionMode == true){
    clearInterval(sessionTimer);
  } else if(number % 2 == 0 && isSessionMode == false){
    clearInterval(breakTimer);
  }

  else{
    if(isSessionMode){
      startSession();
    } 
    else{
      startBreak();
    }
  }
 

  //   number +=1
  //   sessionTimer = setInterval(()=>{
  //     sessionLength -= 1;

      
  //     updateUITimer(sessionLength);
  //     if(breakSessionLength === 0){
  //       startSession();
  //     }
  //   },1000)
  // } else if(isSessionMode && number % 2 == 0){
  //   number += 1;
  //   clearInterval(sessionTimer);
  // } 
  
  // else{
  //   startBreak();
  // }

  // // ---------------------------Switching----------------------------------------
  // if(sessionLength === 0){
  //   startBreak();
  // }

})

breakMinusElement.addEventListener('click', ()=>{
  if(breakSessionElement.textContent >= 2){
    breakSessionLength -= 60;
    breakSessionElement.textContent = breakSessionLength / 60;
  }
  
});

breakPlusElement.addEventListener('click', ()=>{
  if(breakSessionElement.textContent <= 59){
    breakSessionLength += 60;
    breakSessionElement.textContent = breakSessionLength / 60;
  }
  
})

sessionMinusElement.addEventListener('click', ()=>{

  if(sessionElement.textContent >= 2){
    sessionLength -= 60;
    sessionElement.textContent = sessionLength / 60;
  }

  if(isSessionMode){
    timerMinutes.textContent = sessionLength / 60;
  }
  
})

sessionPlusElement.addEventListener('click', ()=>{
  if(sessionElement.textContent <= 59){
    sessionLength += 60;
    sessionElement.textContent = sessionLength / 60;
  }

  if(isSessionMode){
    timerMinutes.textContent = sessionLength / 60;
  }

})

function reset(){
  isSessionMode = true;
  breakSessionLength = FIVE_MINUTES;
  sessionLength = TWENTYFIVE_MINUTES;
  breakSessionElement.textContent = breakSessionLength / 60;
  sessionElement.textContent = sessionLength / 60;
  clearInterval(sessionTimer);
  clearInterval(breakTimer);
  // timerMinutes.textContent = sessionLength / 60;
  timerMinutes.textContent = "25"
  timerSeconds.textContent = '00';
  number = 0;
  beep.pause();
  beep.currentTime = 0;
};

resetButton.addEventListener('click', ()=>{
  reset();
})


