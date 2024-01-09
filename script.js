document.getElementById('fileInput').addEventListener('change', handleFileChange);

function handleFileChange() {
    const fileInput = document.getElementById('fileInput');
    const previewContent = document.getElementById('previewContent');
    const previewSection = document.getElementById('previewSection');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const convertedContent = convertCSV(content);
            const originalFileName = file.name.replace(/\.[^/.]+$/, ""); // Entfernt die Dateiendung
            const newFileName = `${originalFileName}_konvertiert.csv`;

            // Zähle die Anzahl der nicht leeren Zeilen in der konvertierten CSV-Datei
            const numNonEmptyLines = getNumberOfNonEmptyLines(convertedContent);

            // Zeige die Anzahl der Zeilen und die Vorschau an
            previewContent.innerHTML = `<strong>Vorschau der ersten drei Zeilen zur Überprüfung:</strong><br><br>${getPreviewContent(convertedContent, 3)}`;

            // Falls mehr als drei nicht leere Zeilen vorhanden sind, füge "..." hinzu
            if (numNonEmptyLines > 3) {
                previewContent.innerHTML += '<br>...';
                previewContent.innerHTML += `<br>Die Datei enthält insgesamt ${numNonEmptyLines} Zeilen mit Werten.`;
            }

            previewSection.style.display = 'block';
        };

        reader.readAsText(file);
    }
}


function convertFile() {
    const fileInput = document.getElementById('fileInput');
    const previewContent = document.getElementById('previewContent');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const convertedContent = convertCSV(content);
            const originalFileName = file.name.replace(/\.[^/.]+$/, ""); // Entfernt die Dateiendung
            const newFileName = `${originalFileName}_konvertiert.csv`;

            // Zeige die ersten 3 Zeilen der konvertierten CSV-Datei in der Vorschau an
            const previewText = getPreviewContent(convertedContent, 3);
            previewContent.innerText = previewText;

            // Führe den Download aus
            downloadFile(convertedContent, newFileName);
        };

        reader.readAsText(file);
    } else {
        alert('Bitte wählen Sie eine Datei aus.');
    }
}

function convertCSV(content) {
    // Ersetze "|" durch das Semikolon
    return content.replace(/\|/g, ';');
}

function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

function getPreviewContent(content, numLines) {
    // Extrahiere die ersten 'numLines' Zeilen aus dem Inhalt
    const lines = content.split('\n').slice(0, numLines);
    return lines.join('\n');
}

function getNumberOfNonEmptyLines(content) {
    // Zähle die Anzahl der nicht leeren Zeilen im Inhalt
    const lines = content.split('\n').filter(line => line.trim() !== ''); // Entferne Leerzeichen und filtere leere Zeilen
    return lines.length;
}
