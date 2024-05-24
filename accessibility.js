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
    document.body.style.fontSize = '16px';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.classList.remove('black-scheme', 'white-scheme', 'blue-scheme', 'beige-scheme', 'yellow-scheme');
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, .about-section p, .about-section h2, .hero-text h1, .hero-text p').forEach(element => {
        element.classList.remove('black-text', 'white-text', 'dark-blue-text', 'brown-text', 'green-text');
        element.style.fontSize = ''; // Reset font size
    });

    // Reset font size data attributes
    document.querySelectorAll('[data-default-font-size]').forEach(element => {
        element.removeAttribute('data-default-font-size');
    });

    // Reset the header text elements
    document.querySelectorAll('header nav ul li a').forEach(element => {
        element.style.fontSize = '16px';
    });

    currentFontSize = 'medium';

    // Show all images
    toggleImages(true);
    imagesHidden = false;

    const eyeIcon = document.querySelector('header nav ul li a img');
    eyeIcon.style.height = '20px'; // Reset to default height
    eyeIcon.removeAttribute('data-default-icon-size');
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
