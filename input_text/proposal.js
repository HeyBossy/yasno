document.getElementById('image-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
    fileInput.onchange = () => {
        if (fileInput.files && fileInput.files[0]) {
            const form = document.getElementById('document-form');
            form.style.display = 'block';
        }
    };
});

function submitDocument() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file && (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.endsWith(".docx"))) {
        const formData = new FormData();
        formData.append('file', file);

        const loading = document.getElementById('loading');
        loading.style.display = 'flex';

        fetch('https://2a28-192-121-87-204.ngrok-free.app/doc_to_text', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('outputText', data.text);
            window.location.href = '../output_llama/output_text.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при обработке документа.');
        })
        .finally(() => {
            loading.style.display = 'none';
        });
    } else {
        alert('Нужен документ формата .docx');
    }
}
