
// declaration of variables and other elements used in the code
let sequence = [];
let playerSequence = [];
let flash;
let turn;
let good;
let playerTurn;
let intervalID;
let win;
let on = false;
let time;
var highsc = 0;
var currentscore = 0;
var timer = 0;

// calling all html ellements needed for the javascript code(buttons, score&highschore counter, etc)
document.getElementById("progress").innerHTML = currentscore;
document.getElementById("highscore").innerHTML = highsc;
const stat = document.getElementById("stat");
const ButtonRed= document.getElementById("red");
const ButtonGreen = document.getElementById("green");
const ButtonBlue = document.getElementById("blue");
const ButtonYellow = document.getElementById("yellow");
const ButtonStart = document.querySelector("#start");


/* start button code, when button is clicked play() is called and "stat" div turns green */
ButtonStart.addEventListener('click', (event) =>{
    stat.style.backgroundColor = "green";
    play();
  
});


// play function , this is the main part of the game 
// sets all neccsary elements to their required value
// generates a array of size 20 and fills it with random number 1-4
// each number represent one of the coloured buttons
function play() {
  win = false;
  sequence = [];
  playerSequence = [];
  flash = 0;
  intervalID = 0;
  playerTurn = 1;
  good = true;
  for(var i = 0; i< 20; i++){
      sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  console.log(sequence);
  turn = true;
  intervalID = setInterval(gameTurn, 600);
}

//function for makeing the game progress 
// element flash used to check value of the current arrays index 
// flash gets increment each time when flash = playerturn(current round of the game)
// the countown function is called which starts the 5 second timer in which the player must 
// press the correct buttons
function gameTurn()
{
   on = false;
   console.log(flash, playerTurn);
    if( flash == playerTurn)
    {
        clearInterval(intervalID);
        turn = false;
        clearColour();
        time = setInterval(countdown , 1000);
        on = true;
    }

    console.log(turn, sequence[flash]);
    if(turn = true)
    {
        clearColour();
        setTimeout(() =>
        { //each number in the array has a corresponding colour
            if(flash < playerTurn)
            {
              if(sequence[flash] == 1) one();
              if(sequence[flash] == 2) two(); 
              if(sequence[flash] == 3) three();
              if(sequence[flash] == 4) four();
              flash++;

            }
 
        }, 300);
    }
}

//countdown function for the 5 second timmer
function countdown()
{
  timer += 1;
  console.log(timer);
  if(timer >= 5 && timer < 6)
  {
    lose();
  }
}

//4 fucntions bellow makes respective button color brighter works with clear color function to 
//make the colors flash
function one()
{
    ButtonGreen.style.backgroundColor = "#7FFF00";
}

function two()
{
    ButtonRed.style.backgroundColor = "#FF6347";
}

function three()
{
    ButtonYellow.style.backgroundColor = "#FFD700";
}

function four()
{
    ButtonBlue.style.backgroundColor = "#00BFFF";
}

//resets the color of the button to its original shade
function clearColour()
{
    ButtonGreen.style.backgroundColor = "rgb(0, 116, 0)";
    ButtonRed.style.backgroundColor = "rgb(156, 0, 0)";
    ButtonYellow.style.backgroundColor = "rgb(172, 172, 0)";
    ButtonBlue.style.backgroundColor = "rgb(0, 0, 165)";
}

//fucntion to flash all 4 buttons at once upon player winning or losing the game
function flashColour()
{
    ButtonGreen.style.backgroundColor = "#7FFF00";
    ButtonRed.style.backgroundColor = "#FF6347";
    ButtonYellow.style.backgroundColor = "#FFD700";
    ButtonBlue.style.backgroundColor = "#00BFFF";
    
}

//code for clicking green button
// calls one() to make the color flash unpon clicking so user knows it was clicked
// calls check() to check if the player pressed the right button
ButtonGreen.addEventListener('click', (event) =>
{
  timer = 0;
  playerSequence.push(1);
  check();
  one();
  if(!win)
  {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
})

//code for clicking red button
// calls one() to make the color flash unpon clicking so user knows it was clicked
// calls check() to check if the player pressed the right button
ButtonRed.addEventListener('click', (event) =>
{
  timer = 0;
  playerSequence.push(2);
  check();
  two();
  if(!win) {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
})

//code for clicking yellow button
// calls one() to make the color flash unpon clicking so user knows it was clicked
// calls check() to check if the player pressed the right button
ButtonYellow.addEventListener('click', (event) =>
{
  timer = 0;
  playerSequence.push(3);
  check();
  three();
  if(!win)
  {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
})
  
//code for clicking blue button
// calls one() to make the color flash unpon clicking so user knows it was clicked
// calls check() to check if the player pressed the right button
ButtonBlue.addEventListener('click', (event) =>
{
  timer = 0;
  playerSequence.push(4);
  check();
  four();
  if(!win) {
    setTimeout(() =>
    {
      clearColour();
    }, 300);
  }
});

//check function checks is player pressed the right buttons 
function check()
{
  // stopping intervals
  clearInterval(time);
  clearInterval(intervalID);
  timer = 0; // resets 5 second counter

  /*if player fails to press the buttons in the correct sequence they lose
  */
  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1])
  {
    good = false;
  }

  // if 20 rounds are cpleted geame is won and it stops
  if (playerSequence.length == 20 && good)
  {
      winGame();
  }

  // if the player loses the lose function is called
  if (good == false)
  {
    lose();
  }

  /* if statment makes the game harder by flashing the sequaence of buttons faster
  after round 6,10 and 14
  */
  if (playerTurn == playerSequence.length && good && !win)
  {
    playerTurn++;
    playerSequence = [];
    turn = true;
    flash = 0;
    currentscore++;
    document.getElementById("progress").innerHTML = currentscore;


    if(playerTurn < 6)
    {
      intervalID = setInterval(gameTurn, 600);
    }

    else if(_playerTurn => 6)
    {
      intervalID = setInterval(gameTurn, 450);
    }

    else if(_playerTurn => 10)
    {
      intervalID = setInterval(gameTurn, 300);
    }

    else if(_playerTurn => 14)
    {
      intervalID = setInterval(gameTurn, 250);
    }
  }

    setHighscore();
}

// when game is won "stat" turns back to red 
function winGame()
{
  stat.style.backgroundColor = "#dd4b3e";
}

/* if player loses the buttons flash 5 times
  and the on indicator turns back to red.
*/
function lose()
{
  for(var i = 900; i < 4750; i = i + 900)
      {
        setTimeout("flashColour()", i);
        setTimeout("clearColour()", i + 500);
      }
    
        setTimeout(() =>
        {
            setHighscore();
            clearColour();
            stat.style.backgroundColor = "#dd4b3e";
        }, 800);
        timer = 0;
        clearInterval(time);
        currentscore = 0;
        document.getElementById("progress").innerHTML = 0;
        
}

// function sets the highscore of the player once the game is over or if
// the current score is greater than the highscore 
// highscore saved locally so it dosent reset after every game
function setHighscore()
{

  localStorage.getItem('highsc');
  
  if(currentscore > highsc)
  {
    highsc = currentscore;
    document.getElementById("highscore").innerHTML = highsc;
  }
}
localStorage.setItem('highsc', highsc);


