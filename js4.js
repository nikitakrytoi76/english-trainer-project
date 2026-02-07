document.addEventListener("DOMContentLoaded", function() {
    // 1. Получаем уровень пользователя
    const savedData = localStorage.getItem("englishUser");
    const user = savedData ? JSON.parse(savedData) : { level: 'beginner' };
    const userLevel = user.level.toLowerCase();

    document.getElementById('levelLabel').textContent = userLevel;

    // 2. База данных грамматики
    const grammarData = {
        'beginner': [
            {
                title: "Глагол To Be",
                rule: "Используется для описания состояния, того, кем или чем является предмет. Имеет три формы: am, is, are.",
                examples: ["I am a student.", "He is happy.", "They are friends."]
            },
            {
                title: "Present Simple",
                rule: "Используется для регулярных действий. К глаголам (he, she, it) добавляется окончание -s.",
                examples: ["I work every day.", "She speaks English.", "Water boils at 100 degrees."]
            }
        ],
        'elementary': [
            {
                title: "Past Simple",
                rule: "Для действий, которые закончились в прошлом. Используйте вторую форму глагола или окончание -ed.",
                examples: ["I visited London last year.", "She bought a new car.", "They played football."]
            },
            {
                title: "Articles (A/An/The)",
                rule: "A/An — для чего-то нового или общего. The — когда мы оба понимаем, о чем речь.",
                examples: ["I saw a movie.", "The movie was great!", "Give me an apple."]
            }
        ],
        'intermediate': [
            {
                title: "Present Perfect",
                rule: "Связь прошлого с настоящим. Формула: have/has + 3-я форма глагола.",
                examples: ["I have lived here for 10 years.", "She has already finished.", "Have you ever been to Paris?"]
            }
        ],
        'advanced': [
            {
                title: "Conditionals (Type 3)",
                rule: "Сожаления о прошлом. То, что могло бы случиться, но не случилось.",
                examples: ["If I had studied more, I would have passed.", "We wouldn't have been late if we'd taken a taxi."]
            }
        ]
    };

    // 3. Выбираем темы для текущего уровня
    const topics = grammarData[userLevel] || grammarData['beginner'];
    const container = document.getElementById('grammarContainer');

    // 4. Отрисовываем карточки
    topics.forEach(item => {
        // Создаем верстку для каждой карточки
        const card = document.createElement('div');
        card.className = 'grammar-card';

        // Генерируем список примеров
        const examplesHtml = item.examples.map(ex => `<span class="example-item">— ${ex}</span>`).join('');

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p class="rule-text">${item.rule}</p>
            <div class="examples-box">
                <h4>Примеры:</h4>
                ${examplesHtml}
            </div>
        `;

        container.appendChild(card);
    });
});