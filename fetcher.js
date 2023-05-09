const http = require('http');
const filesave = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

http.get(url, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    filesave.writeFile(filePath, body, (err) => {
      if (err) {
        console.log('Error:', err);
      } else {
        const fileSize = filesave.statSync(filePath).size;
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}.`);
      }
    });
  });
}).on('error', (err) => {
  console.log('Error:', err);
});

