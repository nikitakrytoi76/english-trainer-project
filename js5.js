const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const wordDisplay = document.getElementById("wordDisplay");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

const gameWords = [
    { en: "Victory", ru: "Победа" },
    { en: "Knowledge", ru: "Знания" },
    { en: "Future", ru: "Будущее" },
    { en: "Skill", ru: "Навык" },
    { en: "Apple", ru: "Яблоко" }
];

function saveWordToDictionary(wordObj) {
    let dict = JSON.parse(localStorage.getItem("myLearnedWords")) || [];
    if (!dict.some(w => w.en === wordObj.en)) {
        dict.push(wordObj);
        localStorage.setItem("myLearnedWords", JSON.stringify(dict));
    }
}

document.addEventListener("mousemove", (e) => {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
});

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0984e3";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#55efc4";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
    if (y + dy < ballRadius) {
        dy = -dy;
        let randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
        wordDisplay.textContent = `Новое слово: ${randomWord.en}!`;
        saveWordToDictionary(randomWord);
    } 
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dx *= 1.02;
            dy *= 1.02;
        } else {
            // ОСТАНОВКА И ВЫВОД КНОПОК
            dx = 0; 
            dy = 0;
            wordDisplay.innerHTML = `
                <span style="color: #ff7675;">Игра окончена!</span>
                <div style="display: flex; gap: 10px;">
                    <button class="game-btn" onclick="location.reload()" style="background: #55efc4; color: #2d3436;">
                        Заново ↻
                    </button>
                    <button class="game-btn" onclick="location.href='game-words.html'" style="background: #0984e3; color: white;">
                        В словарь 📚
                    </button>
                </div>
            `;
            return; 
        }
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();