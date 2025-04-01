
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 1.5;
var dy = -1.5;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 6;
var brickColumnCount = 10;
var brickWidth = 75;
var brickHeight = 25;
var brickPadding = 0;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var bricks = [];
const img1 = new Image();
img1.src = 'img/slika3.jpg';

const img2 = new Image();
img2.src = 'img/slika3_1.jpg';

const img3 = new Image();
img3.src = 'img/slika3_2.jpg';

const paddle = new Image();
paddle.src = 'paddle.jpg';

const ball = new Image();
ball.src = 'img/.jpg';





for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 3 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {

            if (bricks[c][r].status !=0) {

                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                switch(bricks[c][r].status){
                    case 1:ctx.drawImage(img3,brickX, brickY, brickWidth, brickHeight);break;
                    case 2:ctx.drawImage(img2,brickX, brickY, brickWidth, brickHeight);break;
                    case 3:ctx.drawImage(img1,brickX, brickY, brickWidth, brickHeight);break;
                }
            }
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status !=0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight + ballRadius) {
                    dy = -dy;
                    b.status -= 1;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        document.location.reload();
                    }
                }
            }
        }
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
        if (x > paddleX  && x < paddleX + paddleWidth +2 ) {
            dy = -dy;
        } else if(y > canvas.height - ballRadius){
            dx = 0;
            dy = 0;
        }
    }
    
    if (rightPressed && paddleX < canvas.width - paddleWidth + 1) {
        paddleX += 4;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
