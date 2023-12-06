const fs = require('node:fs');
const readline = require('node:readline');

const numberMap = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
};

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

    var firstDigit = null, lastDigit = null;

    for (var i = 0; firstDigit == null; i++) {
      for (var property in numberMap) {
        if (line.substring(i).startsWith(property)) {
          firstDigit = parseInt(numberMap[property]);
          break;
        }
      }
    }

    for (var i = line.length; lastDigit == null; i--) {
      for (var property in numberMap) {
        if (line.substring(i).startsWith(property)) {
          lastDigit = parseInt(numberMap[property]);
          break;
        }
      }
    }

    const thisval = firstDigit * 10 + lastDigit;
    console.log(thisval);
    sum += thisval;
  }

  console.log(`Final sum: ${sum}`)
}

processLineByLine();