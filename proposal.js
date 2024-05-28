let currentFontSize = 'medium';
let imagesHidden = false;

function toggleAccessibility() {
    const accessibilityBar = document.getElementById('accessibilityBar');
    if (accessibilityBar.style.display === "none") {
        accessibilityBar.style.display = "flex";
        if (imagesHidden) {
            toggleImages(false); // Ensure images remain hidden when opening accessibility bar
        }
    } else {
        accessibilityBar.style.display = "none";
    }
    ensureEyeIconVisibility();
}

function changeFontSize(size) {
    if (currentFontSize === size) return;

    let scaleFactor;
    switch(size) {
        case 'small':
            scaleFactor = 1.05;
            break;
        case 'medium':
            scaleFactor = 1.10;
            break;
        case 'large':
            scaleFactor = 1.20;
            break;
        default:
            scaleFactor = 1.0;
    }

    const elements = document.querySelectorAll('body *:not(.accessibility-bar *):not(header nav ul li a img)');
    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        const defaultFontSize = element.getAttribute('data-default-font-size');

        if (defaultFontSize) {
            element.style.fontSize = (parseFloat(defaultFontSize) * scaleFactor) + 'px';
        } else {
            element.setAttribute('data-default-font-size', fontSize);
            element.style.fontSize = (fontSize * scaleFactor) + 'px';
        }
    });

    currentFontSize = size;
    ensureEyeIconVisibility();
}

function changeFontFamily(font) {
    let fontFamily;
    switch(font) {
        case 'arial':
            fontFamily = 'Arial, sans-serif';
            break;
        case 'verdana':
            fontFamily = 'Verdana, sans-serif';
            break;
        case 'tahoma':
            fontFamily = 'Tahoma, sans-serif';
            break;
        default:
            fontFamily = 'Arial, sans-serif';
    }
    document.body.style.fontFamily = fontFamily;
}

function changeColorScheme(scheme) {
    const bodyClassList = document.body.classList;
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');

    // Clear existing classes
    bodyClassList.remove('black-scheme', 'white-scheme', 'blue-scheme', 'beige-scheme', 'yellow-scheme');
    textElements.forEach(element => {
        element.classList.remove('black-text', 'white-text', 'dark-blue-text', 'brown-text', 'green-text');
    });

    // Apply new classes
    switch(scheme) {
        case 'black':
            bodyClassList.add('black-scheme');
            textElements.forEach(element => {
                if (!element.closest('.accessibility-bar')) {
                    element.classList.add('white-text');
                }
            });
            break;
        case 'white':
            bodyClassList.add('white-scheme');
            textElements.forEach(element => {
                if (!element.closest('.accessibility-bar')) {
                    element.classList.add('black-text');
                }
            });
            break;
        case 'blue':
            bodyClassList.add('blue-scheme');
            textElements.forEach(element => {
                if (!element.closest('.accessibility-bar')) {
                    element.classList.add('dark-blue-text');
                }
            });
            break;
        case 'beige':
            bodyClassList.add('beige-scheme');
            textElements.forEach(element => {
                if (!element.closest('.accessibility-bar')) {
                    element.classList.add('brown-text');
                }
            });
            break;
        case 'yellow':
            bodyClassList.add('yellow-scheme');
            textElements.forEach(element => {
                if (!element.closest('.accessibility-bar')) {
                    element.classList.add('green-text');
                }
            });
            break;
        default:
            bodyClassList.add('white-scheme');
            textElements.forEach(element => {
                if (!element.closest('.accessibility-bar')) {
                    element.classList.add('black-text');
                }
            });
    }
    updateActiveButton(`color-${scheme}`);
}

function toggleImages(show) {
    const images = document.querySelectorAll('img:not(.accessibility-bar img)');
    images.forEach(image => {
        image.style.display = show ? "block" : "none";
    });
    imagesHidden = !show;
    updateActiveButton(show ? 'images-on' : 'images-off');
}

function toggleSound() {
    let textContent = '';
    const elements = document.querySelectorAll('.proposal-section .proposal-card, main, .about-text p');
    elements.forEach(element => {
        textContent += element.textContent + ' ';
    });

    textContent = textContent.trim();
    const data = JSON.stringify({ text: textContent });

    fetch('/api//text_to_speech', { // Замените на реальный URL
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
        const audioUrl = window.URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
    })
    .catch(error => console.error('Ошибка:', error));
}

function resetAccessibility() {
    document.body.style.fontSize = '';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.classList.remove('black-scheme', 'white-scheme', 'blue-scheme', 'beige-scheme', 'yellow-scheme');

    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, .about-section p, .about-section h2, .hero-text h1, .hero-text p').forEach(element => {
        element.classList.remove('black-text', 'white-text', 'dark-blue-text', 'brown-text', 'green-text');
        element.style.fontSize = '';
        element.style.fontFamily = '';
        element.style.color = '';
        element.style.backgroundColor = '';
    });

    document.querySelectorAll('[data-default-font-size]').forEach(element => {
        element.removeAttribute('data-default-font-size');
    });

    document.querySelectorAll('header nav ul li a').forEach(element => {
        element.style.fontSize = '';
    });

    const proposalCards = document.querySelectorAll('.proposal-card');
    proposalCards.forEach(card => {
        card.style.width = card.getAttribute('data-default-width');
        card.style.height = card.getAttribute('data-default-height');
        card.style.backgroundColor = card.getAttribute('data-default-background-color');
        card.style.color = card.getAttribute('data-default-color');
        card.textContent = card.getAttribute('data-default-text');
    });

    const images = document.querySelectorAll('.about-section .content img.about-image');
    images.forEach(image => {
        image.style.width = '';
        image.style.maxWidth = '';
        image.style.height = '';
    });

    currentFontSize = 'medium';
    toggleImages(true);
    imagesHidden = false;

    const icons = document.querySelectorAll('header nav ul li a img');
    icons.forEach(icon => {
        icon.style.height = '';
        icon.removeAttribute('data-default-icon-size');
        icon.style.verticalAlign = 'middle';
    });

    updateActiveButton('');

    // Reset the form and buttons
    const form = document.getElementById('submission-form');
    form.style.top = form.getAttribute('data-default-top');
    form.style.left = form.getAttribute('data-default-left');
    form.style.transform = form.getAttribute('data-default-transform');
    form.style.display = 'none';

    const inputArea = document.getElementById('input-area');
    inputArea.value = inputArea.getAttribute('data-default-value');
    inputArea.placeholder = inputArea.getAttribute('data-default-placeholder');
}

function ensureEyeIconVisibility() {
    const eyeIcon = document.querySelector('header nav ul li a img');
    if (!eyeIcon) {
        const eyeIconHtml = '<li><a href="#" onclick="toggleAccessibility()"><img src="eye-icon.png" style="height: 20px;"></a></li>';
        const navList = document.querySelector('header nav ul');
        navList.insertAdjacentHTML('beforeend', eyeIconHtml);
    } else {
        eyeIcon.style.display = "block";
    }
}

function updateActiveButton(activeButtonId) {
    const buttons = document.querySelectorAll('.accessibility-bar button');
    buttons.forEach(button => {
        if (button.id === activeButtonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const textButton = document.getElementById('text-button');
    const imageButton = document.getElementById('image-button');

    textButton.addEventListener('click', () => {
        const form = document.getElementById('submission-form');
        const inputArea = document.getElementById('input-area');
        inputArea.value = '';
        inputArea.placeholder = 'Введите текст:';
        form.style.display = 'block';
    });

    imageButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
            if (input.files && input.files[0]) {
                alert('Файл выбран: ' + input.files[0].name);
            }
        };
        input.click();
    });

    const soundButton = document.getElementById('soundButton');
    if (soundButton) {
        soundButton.addEventListener('click', toggleSoundControl);
    } else {
        console.error('Sound button not found');
    }

    const accessibilityButton = document.querySelector('header nav ul li a[onclick="toggleAccessibility()"]');
    if (accessibilityButton) {
        accessibilityButton.addEventListener('click', toggleAccessibility);
    } else {
        console.error('Accessibility button not found');
    }
});

// For sound control
let audio;
let audioUrl = '';
let audioPaused = false;

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

        fetch('/api/text_to_speech', {
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
