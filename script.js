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
