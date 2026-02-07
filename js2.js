document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("englishUser"));
    
    if (userData) {
        document.getElementById('welcomeText').textContent = `Привет, ${userData.name}! 👋`;
        document.getElementById('levelStatus').textContent = `Твой уровень: ${userData.level}`;
        
        const descriptions = {
            'beginner': 'Ты в самом начале пути! Знаешь алфавит и базовые фразы.',
            'elementary': 'Можешь общаться на простые темы и понимать несложные тексты.',
            'intermediate': 'Уверенно говоришь и понимаешь суть сложных материалов.',
            'advanced': 'Свободно владеешь языком на уровне носителя.'
        };
        
        document.getElementById('levelInfo').textContent = descriptions[userData.level] || 'Описание скоро появится!';
    } else {
        location.href = 'firstpage.html';
    }
});

function logout() {
    if (confirm("Выйти?")) {
        localStorage.removeItem("englishUser");
        location.href = 'index.html';
    }

}

