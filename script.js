function convertFile() {
    const fileInput = document.getElementById('fileInput');
    const separator = document.getElementById('separator').value;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const convertedContent = convertCSV(content, separator);
            downloadFile(convertedContent, 'converted_file.csv');
        };

        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
}

function convertCSV(content, newSeparator) {
    // Replace "|" with the new separator
    return content.replace(/\|/g, newSeparator);
}

function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
