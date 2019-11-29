const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const SCORE = document.getElementById('score')
const BTN = document.getElementById("btn")
const STATUS = document.getElementById("status")
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
var ROCKS = []
var gameOver = false;
let dodgerWidth = DODGER.offsetWidth
//let len = ROCKS.length
const START = document.getElementById('start')
const DISP = document.getElementById('disp')
var gameInterval = null
var movT = null

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 37
    const rockLeftEdge = positionToInteger(rock.style.left)
    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 40
    if (rockLeftEdge < dodgerLeftEdge &&  rockRightEdge > dodgerLeftEdge ||
    rockLeftEdge > dodgerLeftEdge &&  rockRightEdge < dodgerRightEdge ||
    rockLeftEdge < dodgerRightEdge &&  rockRightEdge > dodgerRightEdge) {
      return true
    }
  }
}

let rand = 0
let cnt = 0
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  rand = Math.floor(Math.random() * 10)
  rock.innerHTML = rand
  //rock.innerHTML = cnt
  cnt++
  // Hmmm, why would we have used `var` here?
  // var top = -1 * Math.floor(Math.random() *  40)
  //var top = -40
  //var initTop = [-70, -65, -60, -55, -50, -45, -40, -35, -30]
  //var idx = Math.floor(Math.random() * 10)
  //var top = initTop[idx]
  var top = -20
  rock.style.top = `${top}px`
  game.appendChild(rock)
  ROCKS.push(rock)
  //moveRock()
  //disp.innerHTML = ROCKS
  return rock
}

DISP.innerHTML = movT
let len = 0
let point = 0
let rockY = 0
let topNumbers = ''
function moveRock() {
  //DISP.innerHTML = 'entered...'
   len = ROCKS.length
   for (let i=0; i<len-1; i++) {
     //DISP.innerHTML = ROCKS.length
     //if (point > 0) {
     // alert(i + ',' + ROCKS[i])
      //}
     topNumbers = ROCKS[i].style.top.replace('px', '')
     rockY = parseInt(topNumbers, 10)
     //DISP.innerHTML = rockY
     //alert(rockY)
     if (rockY > 380) {
       //rockY = 0
       if (!gameOver) {
         //point++
         //parseInt(ROCKS[i].innerHTML)
         point += parseInt(ROCKS[i].innerHTML)
         SCORE.innerHTML = point
        // DISP.innerHTML = rockY
      }
        ROCKS[i].remove()
        ROCKS.splice(i,1)
      // alert(ROCKS.length)
       //DISP.innerHTML = ROCKS.length

     } else if (checkCollision(ROCKS[i])) {
       //ROCKS[i].remove()
       //ROCKS.splice(i,1)
       //DODGER.style.zIndex = "1";
      // DISP.innerHTML = 'end.'
    //  ROCKS[i].style.backgroundImage = "url('boom.gif')";
    //  var collisionMine = ROCKS[i]
    var y = document.getElementById("bang");
    //x.style.source = 'bomb.mp3'
    //  function playAudio() {
        y.play();
      //}
      ROCKS[i].style.backgroundImage = "url('boom.gif')";

      var boomT
      boomT = setTimeout(function() {
          explode()
        }, 1000)
      // endGame()
     } else {
     ROCKS[i].style.top = `${rockY + 5}px`
    // DISP.innerHTML = 'movig...'
     }
   }
}
//  movT = setInterval(moveRock, 100)
  //alert('t=' + movT)

  function explode() {

    //  obj.style.backgroundImage = "url('boom.gif')";
      //alert(c)
      endGame()
    }


function endGame() {

//  function stopAudio() {
var x = document.getElementById("zik");
    x.pause();
//  }
//  stopAudio()
  gameOver = true;
  STATUS.style.visibility = "visible"
  clearInterval(gameInterval)
  clearInterval(movT)
    for (let i=0; i<ROCKS.length; i++) {
      ROCKS[i].remove()
    }
    ROCKS = []
  //DISP.innerHTML = ROCKS
  //clearInterval(movT)
  //DODGER.style.width = "64px"
  //DODGER.style.height = "64px"
  //DODGER.style.top = "354px"
  //dodger.style.left = "93px"
  DODGER.style.backgroundImage = "url('gravestone.png')";
  //clearInterval(gameInterval)
  //let len = ROCKS.length
  //for (let i=0; i<len; i++) {
  //  ROCKS[i].remove()
  //}
  //STATUS.style.animation = "blinker 2s linear infinite"
  //STATUS.innerHTML = "GAME OVER"
  window.removeEventListener('keydown', moveDodger)
  //START.style.display = 'block'
  //START.style.animation = "blinker 2s linear infinite"
  //START.text = "GAME OVER"
  //alert("YOU LOSE!")
}

function moveDodger(e) {
  if (!gameOver) {
     if (e.which === RIGHT_ARROW) {
       moveDodgerRight()
     }
     if (e.which === LEFT_ARROW) {
       moveDodgerLeft()
     }
   }
}

function moveDodgerLeft() {
     var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  if (left > 0) {
    dodger.style.left = `${left - 4}px`
  }
}

function moveDodgerRight() {
     var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  if (left < GAME_WIDTH-dodgerWidth) {
    dodger.style.left = `${left + 4}px`
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

BTN.addEventListener("click", function(){
  //let len = ROCKS.length
  var x = document.getElementById("zik");
  //x.style.source = 'mc.mp3'
  //  function playAudio() {
  x.pause();
x.currentTime = 0;
  STATUS.style.visibility = "hidden"
  for (let i=0; i<ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  point = 0
  ROCKS = []
  gameOver = false
  clearInterval(gameInterval)
  //
  SCORE.innerHTML = 0
  DODGER.style.backgroundImage = "url('crab.gif')";
  START.style.visibility = "visible"
  //gameInterval = null
  //movT = null
clearInterval(movT)
DISP.innerHTML = ''
//alert('t=' + movT)
});

function start() {
  window.addEventListener('keydown', moveDodger)
var x = document.getElementById("zik");
//x.style.source = 'mc.mp3'
//  function playAudio() {
    x.play();
  //}
//playAudio()
  //START.style.display = 'none'
  START.style.visibility = "hidden"
  //let x = 0
  // x = Math.floor(Math.random() *  (GAME_WIDTH - 20))
  //let y = 0
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 40)))
  }, 1000)
  movT = setInterval(moveRock, 100)
  //const movTimer = setTimeout(moveRock, 500)
}
