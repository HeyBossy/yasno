document.addEventListener('DOMContentLoaded', (event) => {
    fetch('llama_output.json')
        .then(response => response.json())
        .then(data => {
            const text = data.text
                .split('.')
                .map(sentence => sentence.trim())
                .join('.\n');
            document.getElementById('outputText').innerText = text;
        })
        .catch(error => console.error('Error fetching llama_output.json:', error));
});

function loadMetrics() {
    fetch('metrics.json')
        .then(response => response.json())
        .then(data => {
            alert(JSON.stringify(data, null, 2));
        })
        .catch(error => console.error('Error fetching metrics.json:', error));
}

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

        fetch('https://10a2-88-201-206-51.ngrok-free.app/text_to_speech', {
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
        .catch(error => console.error('Ошибка:', error));
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
