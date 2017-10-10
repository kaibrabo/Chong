// Pong Game canvas
var canvas = document.getElementById('a');
var context = canvas.getContext('2d');

var pi = Math.PI;
var radius;

var border = function(){
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
}

// Pong Table
context.beginPath();
context.rect(10, 50, 580, 340);
context.fillStyle = '#444';
context.fill();
border();

//  table decals
radius = 80;
// right side
var sA = pi * 0.5;
var eA = pi * 1.5;
context.beginPath();
context.arc(588, 220, radius, sA, eA, false);
border();
// left side
sA = pi * 1.5;
eA = pi * 0.5;
context.beginPath();
context.arc(12, 220, radius, sA, eA, false);
border();

// Paddle constructor
function Paddle(x, y, w, h, c){
    context.beginPath();
    context.rect(x, y, w, h);
    context.fillStyle = c;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
}

// Player Paddle
var player = new Paddle(565, 170, 15, 90, 'blue');

// Computer Paddle
var computer = new Paddle(20, 170, 15, 90, 'red');

// Ball
var x = canvas.width / 2;
var y = canvas.height / 2;
radius = 15;

var ball = new Ball(x, y, radius, 0, pi*2, false);

function Ball(x, y, radius, startAngle, endAngle, counterClockwise){
    context.beginPath();
    context.arc(x - 20, y, radius, startAngle, endAngle, counterClockwise);
    context.fillStyle = 'gray';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
}

// function Ball(){
//     this.x = canvas / 2;
//     this.y = canvas / 2;
//     this.radius = 15;
//     this.sA = 0;
//     this.eA = pi * 2;
//     this.cC = true;
//     this.render = function(){
//         context.beginPath();
//         context.arc(this.x, this.y, this.radius, this.sA, this.eA, this.cC);
//         context.fillStyle = 'gray';
//         context.fill();
//         context.lineWidth = 5;
//         context.strokeStyle = 'black';
//         context.stroke();
//     };
// };
//
//
// // Instantiated Objects
// var ball = new Ball();
//
// function renderAll(){
//     ball.render();
// };
//
// window.onload = function(){
//     renderAll();
// };
