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

// Score
function Score(x, y) {
    this.player_score = x;
    this.computer_score = y;
}

Score.prototype.update = function(ball) {
    // Scoring Conditional

    // if (ball.x <= ball.radius) {
    //     this.player_score += 1;
    //     if (this.player_score == 11) {
    //         alert("Player Wins!");
    //         ball_reset();
    //     }
    //     table.resetRound();
    // } else if (ball.x >= table.w + ball.radius) {
    //     this.computer_score += 1;
    //     if (this.computer_score == 11) {
    //         alert("Computer Wins, better luck next time..");
    //         ball_reset();
    //     }
    //     table.resetRound();
    // }
};

Score.prototype.render = function(context) {
    context.font = "22px sans-serif";
    context.fillStyle = "#bbb";
    context.fillText("Score", (canvas.width / 2) - 35, 30);

    context.font = "28px sans-serif";
    context.fillText(this.computer_score, (canvas.width / 2) - 70, 30);
    context.fillText(this.player_score, (canvas.width / 2) + 40, 30);
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
function Paddle(x, y, w, h, c, b){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.b = b;
    this.speed = 20;
    // this.speed.max = 20;
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

Paddle.prototype.update = function(ball) {
    var comp_y = ball.y;

    // if Paddle obj is Computer
    if (this.b = true) {
        if ((canvas.height - this.h) >= ball.y && ball.y >= this.h) {
            this.y = ball.y - (this.h / 2);
        }
    }
};

// Animate Player Paddle
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
        this.x += this.v.x * 2;
        this.y += this.v.y * 2;

        // hits wall
        if (this.y <= this.radius || this.y >= table.h - this.radius) {
            this.v.y *= -1;
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

// Press 'Enter' to reload page / reset Ball
var ball_reset = function() {
    location.reload();
};

// Instantiated Objects
var ball = new Ball(canvas.width / 2, canvas.height / 2);
var player = new Paddle(canvas.width - (20 + 15), (canvas.height - 90) / 2, 15, 90, 'blue', false);
var computer = new Paddle(20, (canvas.height - 90) / 2, 15, 90, 'red', true);
var table = new Table(canvas.width, canvas.height);
var score = new Score(0, 0);


function renderAll(){
    table.render(context);
    ball.render(context);
    player.render(context);
    computer.render(context);
    score.render(context);
};

var step = function() {
    animate(step);
    ball.step(table);
    computer.update(ball);
    score.update(ball);
    renderAll();
};

window.onload = function(){
    step();
    addKeyEvents();
};
