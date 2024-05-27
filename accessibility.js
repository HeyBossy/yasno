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

    const elements = document.querySelectorAll('body *:not(.accessibility-bar *):not(header nav ul li a img)');
    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        const defaultFontSize = element.getAttribute('data-default-font-size');

        if (!defaultFontSize) {
            element.setAttribute('data-default-font-size', style.fontSize);
        }

        element.style.fontSize = (parseFloat(element.getAttribute('data-default-font-size')) * scaleFactor) + 'px';
    });

    currentFontSize = size;
    updateActiveButton(`font-${size}`);
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
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, .about-section p, .about-section h2, .hero-text h1, .hero-text p');

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
        if (show) {
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    });
    imagesHidden = !show;
    if (show) {
        updateActiveButton('images-on');
    } else {
        updateActiveButton('images-off');
    }
}

function toggleSound() {
    // Implement sound toggle functionality
    alert('Sound toggle not implemented yet.');
}

function resetAccessibility() {
    document.body.style.fontSize = '';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.classList.remove('black-scheme', 'white-scheme', 'blue-scheme', 'beige-scheme', 'yellow-scheme');

    // Reset text and background color
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, .about-section p, .about-section h2, .hero-text h1, .hero-text p').forEach(element => {
        element.classList.remove('black-text', 'white-text', 'dark-blue-text', 'brown-text', 'green-text');
        element.style.fontSize = '';
        element.style.fontFamily = '';
        element.style.color = '';
        element.style.backgroundColor = '';
    });

    // Reset hero-text class
    const heroTextElements = document.querySelectorAll('.hero-text');
    heroTextElements.forEach(element => {
        element.style.fontSize = '';
        element.style.top = element.getAttribute('data-default-top');
        element.style.left = element.getAttribute('data-default-left');
        element.style.transform = element.getAttribute('data-default-transform');
        element.style.color = 'black';
        element.style.backgroundColor = 'transparent';
    });

    // Reset button in hero section
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.style.fontSize = heroButton.getAttribute('data-default-font-size');
        heroButton.style.padding = heroButton.getAttribute('data-default-padding');
        heroButton.style.transform = 'translate(0, 0)'; // Reset any transformations
    }

    // Reset proposal-section buttons
    const proposalButtons = document.querySelectorAll('.proposal-card button');
    proposalButtons.forEach(button => {
        button.style.width = '200px';
        button.style.height = '150px';
        button.style.fontSize = ''; // Reset font size
        button.style.backgroundColor = '#007bff'; // Reset background color
        button.style.color = 'white'; // Reset text color
        button.style.transform = 'translate(0, 0)'; // Reset any transformations
        button.removeAttribute('data-default-width');
        button.removeAttribute('data-default-height');
    });

    // Reset font size attributes
    document.querySelectorAll('[data-default-font-size]').forEach(element => {
        element.removeAttribute('data-default-font-size');
    });

    document.querySelectorAll('header nav ul li a').forEach(element => {
        element.style.fontSize = '';
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

    clearInterval(slideInterval);
    currentSlide = 0;
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, slideIntervalTime);

    updateActiveButton('');
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
