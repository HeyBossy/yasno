document.addEventListener('DOMContentLoaded', (event) => {
    const text = localStorage.getItem('outputText');
    if (text) {
        document.getElementById('outputText').innerText = text;
    }
});

// Для воспроизведения звука
let audio;
let audioUrl = '';
let audioPaused = false;

document.getElementById('soundButton').addEventListener('click', function () {
    toggleSoundControl(); // Show the sound control bar
});

function toggleSoundControl() {
    const soundControlBar = document.getElementById('soundControlBar');
    if (soundControlBar.style.display === "none") {
        soundControlBar.style.display = "flex";
    } else {
        soundControlBar.style.display = "none";
    }
}

function playAudio() {
    if (!audioUrl) {
        let textContent = '';
        const elements = document.querySelectorAll('main, .about-text p');
        elements.forEach(element => {
            textContent += element.textContent + ' ';
        });

        textContent = textContent.trim();

        const data = JSON.stringify({ text: textContent });

        const loading = document.getElementById('loading');
        loading.style.display = 'flex';

        fetch('https://2a28-192-121-87-204.ngrok-free.app/text_to_speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            audioUrl = window.URL.createObjectURL(blob);
            audio = new Audio(audioUrl);
            audio.play();
            document.getElementById('playButton').style.display = 'none';
            document.getElementById('stopButton').style.display = 'inline';
        })
        .catch(error => console.error('Ошибка:', error))
        .finally(() => {
            loading.style.display = 'none';
        });
    } else {
        if (audioPaused) {
            audio.play();
            audioPaused = false;
        } else {
            audio = new Audio(audioUrl);
            audio.play();
        }
        document.getElementById('playButton').style.display = 'none';
        document.getElementById('stopButton').style.display = 'inline';
    }
}

function stopAudio() {
    if (audio) {
        audio.pause();
        audioPaused = true;
        document.getElementById('playButton').style.display = 'inline';
        document.getElementById('stopButton').style.display = 'none';
    }
}

function restartAudio() {
    if (audio) {
        audio.currentTime = 0;
        audio.play();
        audioPaused = false;
        document.getElementById('playButton').style.display = 'none';
        document.getElementById('stopButton').style.display = 'inline';
    }
}

// Добавлена функция для сброса настроек
function resetAccessibility2() {
    document.body.style.fontSize = '';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.classList.remove('black-scheme', 'white-scheme', 'blue-scheme', 'beige-scheme', 'yellow-scheme');

    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, .about-section p, .about-section h2, .hero-text h1, .hero-text p').forEach(element => {
        element.classList.remove('black-text', 'white-text', 'dark-blue-text', 'brown-text', 'green-text');
        element.style.fontSize = element.getAttribute('data-default-font-size') || '';
        element.style.fontFamily = '';
        element.style.color = '';
        element.style.backgroundColor = '';
    });

    const outputText = document.getElementById('outputText');
    outputText.style.fontSize = outputText.getAttribute('data-default-font-size') || '';
    outputText.removeAttribute('data-default-font-size');

    currentFontSize = 'medium';

    const icons = document.querySelectorAll('header nav ul li a img');
    icons.forEach(icon => {
        icon.style.height = '';
        icon.removeAttribute('data-default-icon-size');
        icon.style.verticalAlign = 'middle';
    });
}

// Добавлен обработчик для кнопки "Вернуть стандартные настройки"
document.querySelector('button[onclick="resetAccessibility2()"]').addEventListener('click', resetAccessibility2);

// Обработчик для изменения размера шрифта
function changeFontSize(size) {
    let scaleFactor;
    switch(size) {
        case 'small':
            scaleFactor = 1.25;
            break;
        case 'medium':
            scaleFactor = 1.50;
            break;
        case 'large':
            scaleFactor = 1.75;
            break;
        default:
            scaleFactor = 1.0;
    }

    const outputText = document.getElementById('outputText');
    const style = window.getComputedStyle(outputText);
    const fontSize = parseFloat(style.fontSize);
    const defaultFontSize = outputText.getAttribute('data-default-font-size');

    if (defaultFontSize) {
        outputText.style.fontSize = (parseFloat(defaultFontSize) * scaleFactor) + 'px';
    } else {
        outputText.setAttribute('data-default-font-size', fontSize);
        outputText.style.fontSize = (fontSize * scaleFactor) + 'px';
    }

    currentFontSize = size;
}
