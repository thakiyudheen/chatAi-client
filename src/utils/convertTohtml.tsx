function convertToHTML(text: any) {

    const lines = text.split('\n');

    let html = '';
    let inList = false;


    lines.forEach((line: any) => {
        line = line.trim();
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        if (line.startsWith('**') && line.endsWith('**')) {

            html += `<h1>${line.replace(/\*\*/g, '')}</h1>`;
        } else if (line.startsWith('***') && line.endsWith('***')) {

            html += `<h3>${line.replace(/\*\*\*/g, '')}</h3>`;
        } else if (line.startsWith('*')) {

            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${line.substring(1).trim()}</li>`;
        } else {

            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<p>${line}</p>`;
        }
    });

    if (inList) {
        html += '</ul>';
    }

    return html;
}

export default convertToHTML