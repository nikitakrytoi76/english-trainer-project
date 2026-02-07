document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById('startBtn');
    const container = document.querySelector('.reg-container');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('userName');
            const levelSelect = document.getElementById('userLevel');

            const userName = nameInput.value.trim();
            const userLevel = levelSelect.value;

            // 1. Проверка данных
            if (userName === "") {
                alert("Пожалуйста, введите ваше имя!");
                return;
            }
            if (userLevel === "") {
                alert("Пожалуйста, выберите уровень!");
                return;
            }

            // 2. Сохраняем данные в память
            const userData = {
                name: userName,
                level: userLevel
            };
            localStorage.setItem("englishUser", JSON.stringify(userData));

            // 3. Эффект "Добро пожаловать"
            // Полностью меняем содержимое карточки
            container.innerHTML = `
                <div style="padding: 20px 0;">
                    <h1 style="color: #0984e3; margin-bottom: 15px;">Добро пожаловать, ${userName}!</h1>
                    <p style="color: #636e72; font-size: 18px;">Подготавливаем твою программу обучения...</p>
                    <div class="loader"></div>
                </div>
            `;

            // 4. Задержка 1.5 секунды (1500 миллисекунд)
            setTimeout(() => {
                window.location.href = 'firstpage.html';
            }, 1500);
        });
    }
});