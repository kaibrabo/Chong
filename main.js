// Pong Game canvas
var animate = window.requestAnimationFrame ||
function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('a');
var context = canvas.getContext('2d');

// Pong Table
function Table(w, h) {
    this.w = w;
    this.h = h;
}

Table.prototype.resetRound = function() {
    ball = new Ball(canvas.width / 2, canvas.height / 2);
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
    this.speed = 20;
}

Paddle.prototype.render = function(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.w, this.h);
    context.fillStyle = this.c;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
    this.move = function(key) {
        context.clearRect(this.x, this.y, this.w, this.h);
        this.y += key;
    };
};

function onKeyDown(e) {
    // up arrow key
    if (e.keyCode == 38) {
        if (player.y >= 20) {
            player.move(-20);
        }
    }

    // down arrow key
    if (e.keyCode == 40) {
        if (player.y <= 290) {
            player.move(20);
        }
    }

    if (e.keyCode == 13) {
        ball_reset();
    }
}

// paddle event
function addKeyEvents() {
    window.addEventListener('keydown', onKeyDown, true);
}

// Ball
function Velocity() {
    this.x = 0;
    this.y = 0;
}

Velocity.prototype.randomize = function() {
    // direction of player paddle
    this.x = -1;
    this.y = 0;

    // to randomize direction
    // var direction = 2 * Math.PI * Math.random();
    // this.x = Math.cos(direction);
    // this.y = Math.sin(direction);
};

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.sA = 0;
    this.eA = Math.PI * 2;
    this.cC = true;
    this.v = new Velocity();
    this.v.randomize();
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

Ball.prototype.step = function(table) {
        var player_front = player.x;
        var player_top = player.y;
        var player_bottom = player.y + player.h;
        var computer_front = computer.x + computer.w;
        var computer_top = computer.y;
        var computer_bottom = computer.y + computer.h;
        this.x += this.v.x;
        this.y += this.v.y;
        this.top = this.y - 5;
        this.bottom = this.y + 5;
        this.left = this.x - 5;
        this.right = this.x + 5;

        // hits wall
        if (this.y <= this.radius || this.y >= table.h - this.radius) {
            this.v.y *= -1;
        }

        if (this.x <= -this.radius || this.x >= table.w + this.radius) {
            table.resetRound();

        }

        // hits player paddle
        if (this.x + this.radius >= player_front &&
            player_bottom >= this.y + this.radius &&
            this.y - this.radius >= player_top) {
            this.v.x *= -1;
        }

        // hits computer paddle
        if (this.x - this.radius <= computer_front &&
            computer_bottom >= this.y + this.radius &&
            computer_top <= this.y - this.radius) {
            this.v.x *= -1;
        }
};

var ball_reset = function() {
    location.reload();
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

var step = function() {
    animate(step);
    ball.step(table);

    renderAll();
};

window.onload = function(){
    step();
    addKeyEvents();
};
