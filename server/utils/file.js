const fs = require('fs');

const readFile = (FILE_URL) => {
    return JSON.parse(fs.readFileSync(FILE_URL, 'utf8'));
};

const writeFile = (obj, FILE_URL) => {
    const content = readFile(FILE_URL);
    content.push(obj);
    fs.writeFileSync(FILE_URL, JSON.stringify(content), 'utf8');
};

module.exports = {
    readFile,
    writeFile
}