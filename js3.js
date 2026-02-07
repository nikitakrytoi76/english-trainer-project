document.addEventListener("DOMContentLoaded", function() {
    // 1. Получаем данные пользователя из памяти
    const savedData = localStorage.getItem("englishUser");
    const user = savedData ? JSON.parse(savedData) : { level: 'beginner' }; // Если данных нет, ставим beginner
    
    const userLevel = user.level.toLowerCase(); // Приводим к нижнему регистру для надежности

    // 2. Объект со списками слов для разных уровней
    const dictionary = {
        'beginner': [
            { en: "Apple", ru: "Яблоко", ex: "I like red apples." },
            { en: "Cat", ru: "Кот", ex: "My cat is sleeping." },
            { en: "Home", ru: "Дом", ex: "Go home now." }
        ],
        'elementary': [
            { en: "Journey", ru: "Путешествие", ex: "Have a nice journey!" },
            { en: "Weather", ru: "Погода", ex: "The weather is fine today." },
            { en: "Habit", ru: "Привычка", ex: "Smoking is a bad habit." }
        ],
        'intermediate': [
            { en: "Experience", ru: "Опыт", ex: "I have experience in this field." },
            { en: "Opportunity", ru: "Возможность", ex: "Don't miss this opportunity." },
            { en: "Succeed", ru: "Преуспеть", ex: "You will succeed if you try." }
        ],
        'advanced': [
            { en: "Inevitable", ru: "Неизбежный", ex: "Change is inevitable." },
            { en: "Ambiguous", ru: "Двусмысленный", ex: "His answer was ambiguous." },
            { en: "Perseverance", ru: "Настойчивость", ex: "Success requires perseverance." }
        ]
    };

    // 3. Выбираем нужный список слов (если уровня нет в списке, берем beginner)
    let words = dictionary[userLevel] || dictionary['beginner'];

    let currentIndex = 0;
    const card = document.getElementById('card');

    // --- Функции для работы карточек (как раньше) ---

    window.flipCard = function() {
        card.classList.toggle('flipped');
    }

    window.updateCard = function() {
        card.classList.remove('flipped');

        setTimeout(() => {
            document.getElementById('wordEn').textContent = words[currentIndex].en;
            document.getElementById('wordRu').textContent = words[currentIndex].ru;
            document.getElementById('wordEx').textContent = words[currentIndex].ex;
            document.getElementById('progress').textContent = `${currentIndex + 1} / ${words.length}`;
            
            document.getElementById('prevBtn').disabled = currentIndex === 0;
            document.getElementById('nextBtn').disabled = currentIndex === words.length - 1;
        }, 200);
    }

    window.nextWord = function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            updateCard();
        }
    }

    window.prevWord = function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCard();
        }
    }

    // Запускаем первую карточку
    updateCard();
});