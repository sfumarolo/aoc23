const fs = require('node:fs');
const readline = require('node:readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream(process.argv[2]);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  var sum = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    const digits = line.replace(/([^0-9])+/g, '');
    console.log(`Digits only: ${digits}`);
    const thisval = parseInt(digits[0]) * 10 + parseInt(digits[digits.length - 1]);
    console.log(thisval);
    sum += thisval;
  }

  console.log(`Final sum: ${sum}`)
}

processLineByLine();