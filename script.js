document.getElementById('soundButton').addEventListener('click', function() {
    // Собрать текст со страницы кроме шапки
    let textContent = '';
    const elements = document.querySelectorAll('main, .about-text p');
    elements.forEach(element => {
        textContent += element.textContent + ' ';
    });

    // Удалить лишние пробелы
    textContent = textContent.trim();

    // Подготовка данных для запроса
    const data = JSON.stringify({ text: textContent });

    // Отправка POST запроса
    fetch('https://e412-88-201-206-51.ngrok-free.app/text_to_speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: data
    })
    .then(response => {
        console.log(response); // Вывод ответа сервера в консоль для отладки
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        console.log('Получен файл:', blob); // Вывод информации о файле в консоль
        const audioUrl = window.URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
    })
    .catch(error => console.error('Ошибка:', error));
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function submitText() {
    const text = document.getElementById('textInput').value;
    closeModal('textModal');
    window.location.href = 'third_page.html';
}

function submitImage() {
    const image = document.getElementById('imageInput').files[0];
    closeModal('imageModal');
    window.location.href = 'third_page.html';
}

function submitURL() {
    const url = document.getElementById('urlInput').value;
    closeModal('urlModal');
    window.location.href = 'third_page.html';
}

function ensureDefaultTextColor() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, .about-section p, .about-section h2, .hero-text h1, .hero-text p, .hero button');
    textElements.forEach(element => {
        element.style.color = 'black'; // Set the default text color
    });
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', ensureDefaultTextColor);
