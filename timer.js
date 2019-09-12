var count;
var countState=true;
var sessionState=0;
function startTimer(duration, timerDisplay) {
  var timer = duration, minutes, seconds;
  var timeQuery = document.querySelector('#timer');

  count = setInterval(function () {
    if(countState){
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      timerDisplay.textContent = minutes + ":" +seconds;

      if(timer == 59 ){
        playSingleBell();
        timeQuery.style.color="#FF0D0D";
        timeQuery.style.textShadow="4px 4px white";
      }


      if (--timer < 0) {
        //timer = duration;
        playDoubleBell();
        clearInterval(count);
        setSession(2);
      }
    }
  }, 1000);
}

function countDown(time) {
  clearInterval(count);
  var fiveMinutes = 60 * time;
  var timer = document.querySelector('#timer');
  startTimer(fiveMinutes,timer);
};

function setSession(state) {
  var timeQuery = document.querySelector('#timer');
  var titleQuery = document.querySelector('#title');
  if(state==0){
    titleQuery.textContent = "IDEA PITCH";
    timeQuery.textContent = "00:00";
    sessionState=0;
    timeQuery.style.color = "white"
    timeQuery.style.textShadow = "4px 4px black";
  }
  else if(state==1){
    sessionState=1;
    titleQuery.textContent = "Q & A";
    timeQuery.textContent = "00:00";
    timeQuery.style.color = "white"
    timeQuery.style.textShadow = "4px 4px black";
  }
  else{
    sessionState = 2;
    timeQuery.style.color = "#FF0D0D"
    timeQuery.style.textShadow = "4px 4px white";
  }

}

function pauseTime(){
  if(countState==true){
    countState = false;
  }
  else if(countState==false){
    countState = true;
  }
}

function playSingleBell() {
  var audio = new Audio('SingleBell.ogg');
  audio.type = 'audio/ogg';

  audio.play();

}

function playDoubleBell() {
  var audio1 = new Audio('DoubleBell.ogg');
  audio1.type = 'audio/ogg';

  audio1.play();

}
