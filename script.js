
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var ballRadius = 20;
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
var gameOver = false;
var isGameRunning = false;

const img1 = new Image();
img1.src = 'img/slika1.png';

const img2 = new Image();
img2.src = 'img/slika2.png';

const img3 = new Image();
img3.src = 'img/slika3.png';

const paddle = new Image();
paddle.src = 'img/paddle.jpg';

const ball = new Image();
ball.src = 'img/ball.png';



document.getElementById("credits").addEventListener("click", function () {
    Swal.fire({
        title: "Avtor: Gašper Manfreda",
        html:" Razred: 4.RA <br> ERŠ Nova Gorica",
        icon: "info",
        customClass:{
            confirmButton: 'ok_button',
            popup: 'sw_font'
            
        }
      });
});

document.getElementById("start_button").addEventListener("click", function () {
    if (!isGameRunning) {
        isGameRunning = true;
        draw();
    }
});

document.getElementById("stop_button").addEventListener("click", function () {
    isGameRunning = false;
    
});

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
    ctx.drawImage(ball, x, y, ballRadius, ballRadius);
}

function drawPaddle() {
    ctx.drawImage(paddle, paddleX, canvas.height - paddleHeight -5, paddleWidth, paddleHeight);
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
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight ) {
                    dy = -dy;
                    b.status -= 1;
                    score++;
                    if (score === brickRowCount * brickColumnCount*3) {
                        Swal.fire({
                            title: 'You Win!',
                            text: 'Congratulations, you broke all the bricks!',
                            icon: 'success',
                            confirmButtonText: 'Play Again',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                document.location.reload(); 
                            }
                        });
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
    if(isGameRunning){
    collisionDetection();
    
    if (x + dx > canvas.width - ballRadius || x + dx < 0) {
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
            gameOver = true;
            Swal.fire({
                title: 'Game Over!',
                text: 'Click restart to try again',
                icon: 'error',
                confirmButtonText: 'Restart',
            }).then((result) => {
                if (result.isConfirmed) {
                    document.location.reload(); 
                }
            });
        }
    }
    
    if (rightPressed && paddleX < canvas.width - paddleWidth + 1) {
        paddleX += 4;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
    
    x += dx;
    y += dy;
}
    if (!gameOver) {
        requestAnimationFrame(draw);
    }

}

draw();
