var count;
var countState=true;
var sessionState=0;
function startTimer(duration, timerDisplay) {
    var timer = duration, minutes, seconds;
    var timeQuery = document.querySelector('#timer');
    count = setInterval(function () {
      if(countState){
        timeQuery.style.fontFamily = "digital-7 mono";
        timeQuery.style.fontSize = "300px";
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" +seconds;

        if(sessionState == 0 && timer == 60 ){
          playAudio();
          timeQuery.style.color="#FF0D0D";
          timeQuery.style.textShadow="4px 4px white";
        }
        if(sessionState == 1 && timer == 30 ){
          playAudio();
          timeQuery.style.color="#FF0D0D";
          timeQuery.style.textShadow="4px 4px white";
        }
        if(sessionState == 1 && timer == 0){
          clearInterval(count);
          console.log("1 minute");
          setSession(2);
          playAudio();
          countDown(1);
        }
        else if(sessionState == 2 && timer == 0){
          clearInterval(count);
          setSession(0);
        }

        else if (--timer < 0) {
            //timer = duration;
            console.log("Before");
            clearInterval(count);
            setSession(1);
            console.log("After");
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
  if(state==0){
      timeQuery.textContent = "00:00";
      sessionState=0;
      timeQuery.style.color = "white"
      timeQuery.style.textShadow = "4px 4px black";
  }
  else if(state==1){
    timeQuery.style.fontFamily = "sans-serif"
    timeQuery.style.fontSize = "200px";
    timeQuery.textContent = "Q & A";
    sessionState=1;
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

function playAudio() {
  var audio = new Audio('service-bell_daniel_simion.ogg');
  audio.type = 'audio/ogg';

  var playPromise = audio.play();

  if (playPromise !== undefined) {
      playPromise.then(function () {
          console.log('Playing....');
      }).catch(function (error) {
          console.log('Failed to play....' + error);
      });
  }
}
