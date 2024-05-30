document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            image: 'path/to/image1.jpg',
            title: 'О нас',
            text: 'Наш сервис помогает упрощать сложные тексты, делая их доступными для людей с ментальными особенностями, пожилых и тех, кто плохо знает русский язык.'
        },
        {
            image: 'path/to/image2.jpg',
            title: 'Версия для слепых',
            text: 'Мы обеспечиваем версию для слабовидящих людей, делая информацию доступной и удобной для всех.'
        },
        {
            image: 'path/to/image3.jpg',
            title: 'Озвучивание текста',
            text: 'Наш сервис предлагает высококачественное озвучивание упрощенных текстов, позволяя вам слушать информацию в удобном формате.'
        }
    ];

    let currentSlide = 0;
    const slideIntervalTime = 6000;
    let slideInterval;

    const aboutImage = document.querySelector('.about-section .content img.about-image');
    const aboutTitle = document.querySelector('.about-section .about-text h2');
    const aboutText = document.querySelector('.about-section .about-text p');

    const updateSlide = (index) => {
        const slide = slides[index];
        aboutImage.src = slide.image;
        aboutTitle.textContent = slide.title;
        aboutText.textContent = slide.text;
    };

    const showSlide = (index) => {
        aboutImage.classList.remove('active');
        aboutText.classList.remove('active');
        setTimeout(() => {
            updateSlide(index);
            aboutImage.classList.add('active');
            aboutText.classList.add('active');
        }, 500);
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    };

    document.getElementById('prev').addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });

    document.getElementById('next').addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });

    // Initialize first slide and start automatic sliding
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, slideIntervalTime);
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
        element.style.color = 'black';
    });
}

// Для прокрутки слайдов
document.addEventListener('DOMContentLoaded', ensureDefaultTextColor);

document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            image: '../data/photo2.jpg',
            title: 'О нас',
            text: 'Наш сервис помогает упрощать сложные тексты, делая их доступными для людей с ментальными особенностями, пожилых и тех, кто плохо знает русский язык.'
        },
        {
            image: '../data/photo4.jpg',
            title: 'Версия для слабовидящих',
            text: 'Мы обеспечиваем версию для слабовидящих людей, делая информацию доступной и удобной для всех.'
        },
        {
            image: '../data/photo3.jpg',
            title: 'Озвучивание текста',
            text: 'Наш сервис предлагает высококачественное озвучивание упрощенных текстов, позволяя вам слушать информацию в удобном формате.'
        }
    ];

    let currentSlide = 0;
    const slideIntervalTime = 5000;
    let slideInterval;

    const aboutImage = document.getElementById('slider-image');
    const aboutTitle = document.querySelector('.about-text h2');
    const aboutText = document.querySelector('.about-text p');

    const updateSlide = (index) => {
        const slide = slides[index];
        aboutImage.src = slide.image;
        aboutTitle.textContent = slide.title;
        aboutText.textContent = slide.text;
    };

    const showSlide = (index) => {
        aboutImage.classList.remove('active');
        aboutText.classList.remove('active');
        setTimeout(() => {
            updateSlide(index);
            aboutImage.classList.add('active');
            aboutText.classList.add('active');
        }, 50);
    };

    document.getElementById('prev').addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });

    document.getElementById('next').addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });

    const nextSlide = () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    };

    // Initialize first slide and auto slide
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, slideIntervalTime);

    window.resetSlidePositions = resetSlidePositions;
});

//Для воспроизведения звука
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

        fetch('https://5ba7-88-201-206-51.ngrok-free.app/text_to_speech', {
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
