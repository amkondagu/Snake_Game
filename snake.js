const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const numSq = 20;
const sq = width/numSq;
ctx.strokeStyle = '#202020';
let movable = false;
function clear() {
  ctx.beginPath();
  ctx.fillStyle = '#202020';
  ctx.rect(0,0,width,width);
  ctx.fill();
}

function start() {
  snake = [
    {x:4, y:10},
    {x:3, y:10},
    {x:2, y:10},
  ];
apple = {x:15,y:10};
movable = true;
vel = {x:1,y:0};
requestAnimationFrame(main);

}

function drawHead() {
  ctx.fillStyle = 'rgb(50,255,200)';
  let x = snake[0].x*sq;
  let y = snake[0].y*sq
  ctx.beginPath();
  ctx.rect(x,y ,sq,sq);
  ctx.fill();
//  ctx.stroke();
  ctx.fillStyle = 'black';
  if(vel.y=== 0) { //facing right or left
    ctx.beginPath();
    ctx.arc(x+0.5*sq, y+0.25*sq, sq/10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x+0.5*sq, y+0.75*sq, sq/10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'rgb(255,100,100)';
    if(vel.x === 1) { //facing right
      ctx.beginPath();
      ctx.rect(x+sq,y+Math.round(0.4*sq) ,0.5*sq ,Math.round(0.2*sq));
      ctx.fill();
      //ctx.stroke();
    } else if(vel.x === -1) { //facing left
      ctx.beginPath();
      ctx.rect(x-0.5*sq,y+Math.round(0.4*sq) ,0.5*sq, Math.round(0.2*sq));
      ctx.fill();
      //ctx.stroke();
    }
  } else if (vel.x===0) { // facing up or down
    ctx.beginPath();
    ctx.arc(x+0.25*sq, y+0.5*sq, sq/10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x+0.75*sq, y+0.5*sq, sq/10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'rgb(255,100,100)';
    if(vel.y === 1) { //facing up
      ctx.beginPath();
      ctx.rect(x+Math.round(0.4*sq),y-0.5*sq ,Math.round(0.2*sq),0.5*sq);
      ctx.fill();
      //ctx.stroke();
    } else if(vel.y === -1) { //facing down
      ctx.beginPath();
      ctx.rect(x+Math.round(0.4*sq),y+sq ,Math.round(0.2*sq),sq*0.5);
      ctx.fill();
      //ctx.stroke();
    }
  }
}

function makeGrid() {
  ctx.strokeStyle = 'white';
  //ctx.lineWidth = 5
  for(let i=0;i<=numSq;i++) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0,i*sq);
    ctx.lineTo(width, i*sq);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i*sq, 0);
    ctx.lineTo(i*sq, width);
    ctx.stroke();
  }
}
let apple = {x:15,y:10};

console.log(apple);

let snake = [

  {x:4, y:10},
  {x:3, y:10},
  {x:2, y:10},
];
 let highscore = 0;


vel = {x:1,y:0};

function drawSnake() {
  document.getElementById('title').innerHTML = 'Apples: '+(snake.length-3) + '   High Score: '+ highscore;
  clear();
  //makeGrid();
  ctx.beginPath();
  ctx.rect(0,0,width,width)
  ctx.stroke();
  ctx.fillStyle = 'red'
  ctx.beginPath();
  ctx.rect(apple.x*sq,apple.y*sq ,sq,sq);
  ctx.fill();
  //ctx.lineWidth = 10;
  //ctx.stroke();
  for(let i in snake) {
    let x = snake[i].x*sq;
    let y = snake[i].y*sq
    if(i==0) {
      drawHead();
    } else {
      ctx.fillStyle = 'rgb(50,255,200)';

      ctx.beginPath();
      ctx.rect(x,y ,sq,sq);
      ctx.fill();
      //ctx.stroke();
    }
  }
}

function generateApple() {
  apple = null
  while(apple===null) {
    apple = {}
    apple.x = Math.floor(Math.random()*(numSq-1))
    apple.y = Math.floor(Math.random()*(numSq-1))
    for(let i of snake) {
      if(i.x===apple.x && i.y === apple.y) {
        apple = null;
        break;
      }
    }
  }
  return apple;
}

document.addEventListener('keydown', changeVel);

function changeVel(e) {
  //console.log(vel.y);
  if (movable) {
    //console.log(movable);
    if(e.keyCode===37 || e.keyCode===65) { //left arrow
      if(vel.y!==0) {
        vel = {x:-1, y:0};
        move();
        //movable = false;
      }
    }
     else if(e.keyCode===38 || e.keyCode === 87) { //uparrow
      if(vel.x!==0) {
        vel = {x:0, y:1};
        move();
        //movable = false;
      }
    }
    else if(e.keyCode===39 || e.keyCode===68) { // right arrow
      if(vel.y !== 0) {
        vel = {x:1, y:0};
        move();
        //movable = false;
      }
    }
    else if(e.keyCode===40 || e.keyCode===83) { //down arrow
      if(vel.x !== 0) {
        vel = {x:0, y:-1};
        move();
        //movable = false;
      }
    }/* else if(e.keyCode===32) {
      snake.unshift({...snake[0]});
      //console.log(copy);
      snake[0].x += vel.x;
      snake[0].y -= vel.y;
      //console.log(snake);
    } */
    if(die()) {
      //console.log(snake);
      movable = false;
      //return;
    }
    eat();
  } else {
    start();
  }
}


drawSnake();
//console.log(snake);
function move() {
  //console.log(snake);
  if (movable) {
    snake.unshift(snake.splice(snake.length-1, 1)[0]);
    //console.log(snake);
    snake[0] = {...snake[1]};
    //console.log(snake[0])

    snake[0].x += vel.x;
    snake[0].y -= vel.y;

    drawSnake();
}
}
//console.log(snake);

function die() {
  //console.log(snake[0]);
  if(snake[0].x > numSq-1 || 0 > snake[0].x || snake[0].y > numSq-1 || snake[0].y < 0) {
    console.log('death');
    return true;
  }
  for(let i=1; i<snake.length;i++) {
    //for(let j=0; i<=snake.length;i++) {
    //  console.log(snake[0], snake[i]);
      if(snake[0].x==snake[i].x && snake[0].y==snake[i].y) {

        return true;
      //}
    }
  }
}


move();
function eat() {
  if(snake[0].x === apple.x && snake[0].y === apple.y) {
    snake.push({...snake[snake.length-1]});
    //console.log(copy);
    snake[snake.length-1].x -= vel.x;
    snake[snake.length-1].y += vel.y;
    apple = generateApple();
  }
}
let lastFrameTimeMs = 0; // The last time the loop was run
let maxFPS = 10; // The maximum FPS we want to allow
function main(timestamp) {

  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    requestAnimationFrame(main);
    return;
    }
  move();
  //movable = true;
  if(die()) {
    //console.log('death');
    movable = false;

    return;
  }
  if(snake.length-3 > highscore) {
    highscore = snake.length-3;
  }
  eat();
  lastFrameTimeMs = timestamp;
  requestAnimationFrame(main);
}
