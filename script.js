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

    document.getElementById('prev').addEventListener('click', (event) => {
        event.preventDefault();
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });

    document.getElementById('next').addEventListener('click', (event) => {
        event.preventDefault();
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    });

    // Initialize first slide and start automatic sliding
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, slideIntervalTime);
});

// Функция для обработки POST запроса для озвучивания текста
document.getElementById('soundButton').addEventListener('click', function (event) {
    // Предотвращение действия по умолчанию
    event.preventDefault();

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
        element.style.color = 'black';
    });
}

document.addEventListener('DOMContentLoaded', ensureDefaultTextColor);
