// Pong Game canvas
var canvas = document.getElementById('a');
var context = canvas.getContext('2d');

// Pong Table
function Table(w, h) {
    this.w = w;
    this.h = h;
}

Table.prototype.render = function(context) {
    var radius = 80;
    var border = function(){
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.stroke();
    }

    context.beginPath();
    context.rect(0, 0, this.w, this.h);
    context.fillStyle = '#444';
    context.fill();
    border();

    //  table decals
    // right side
    var sA = Math.PI * 0.5;
    var eA = Math.PI * 1.5;
    context.beginPath();
    context.arc(this.w, this.h / 2, radius, sA, eA, false);
    border();
    // left side
    sA = Math.PI * 1.5;
    eA = Math.PI * 0.5;
    context.beginPath();
    context.arc(0, this.h / 2, radius, sA, eA, false);
    border();
};

// Paddle constructor
function Paddle(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
}

Paddle.prototype.render = function(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.w, this.h);
    context.fillStyle = this.c;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
};

// Ball
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.sA = 0;
    this.eA = Math.PI * 2;
    this.cC = true;
};

Ball.prototype.render = function(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.sA, this.eA, this.cC);
    context.fillStyle = 'gray';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
};

// Instantiated Objects
var ball = new Ball(canvas.width / 2, canvas.height / 2);
var player = new Paddle(canvas.width - (20 + 15), (canvas.height - 90) / 2, 15, 90, 'blue');
var computer = new Paddle(20, (canvas.height - 90) / 2, 15, 90, 'red');
var table = new Table(canvas.width, canvas.height);


function renderAll(){
    table.render(context);
    ball.render(context);
    player.render(context);
    computer.render(context);
};

window.onload = function(){
    renderAll();
};
