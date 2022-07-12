const xlsx = require('node-xlsx')

// Parse a file
const workSheet = xlsx.parse(`${__dirname}/excel.xlsx`);

console.log(workSheet);