const fs = require('fs');

console.log('Translation started.');

// Record start time and memory usage
const startUsage = process.memoryUsage().heapUsed;
const startTime = process.hrtime();

// Read input files
console.log('Reading input files...');
const textFile = fs.readFileSync('t8.shakespeare.txt', 'utf-8');
const findWordsFile = fs.readFileSync('find_words.txt', 'utf-8');
const dictionaryFile = fs.readFileSync('french_dictionary.csv', 'utf-8');

// Convert dictionary file to Map
console.log('Converting dictionary file to map...');
const dictionary = new Map();
dictionaryFile.split('\n').forEach(line => {
  const [englishWord, frenchWord] = line.trim().split(',');
  if (englishWord && frenchWord) {
    dictionary.set(englishWord.toLowerCase(), frenchWord);
  }
});

// Replace words in find words list with French equivalents and record frequency
console.log('Translating words...');
const frequency = new Map();
let translatedText = textFile;
findWordsFile.trim().split('\n').forEach(word => {
  const regex = new RegExp('\\b' + word + '\\b', 'gi');
  const frenchWord = dictionary.get(word.toLowerCase());
  if (frenchWord) {
    const matches = translatedText.match(regex);
    if (matches) {
      frequency.set(word, matches.length);
      translatedText = translatedText.replace(regex, frenchWord);
    }
  }
});

// Write output files
console.log('Writing output files...');
fs.writeFileSync('t8.shakespeare.translated.txt', translatedText);
fs.writeFileSync('frequency.csv', 'English word,French word,Frequency\n');
frequency.forEach((value, key) => {
  const frenchWord = dictionary.get(key.toLowerCase());
  fs.appendFileSync('frequency.csv', `${key},${frenchWord},${value}\n`);
});

// Record end time and memory usage, and calculate elapsed time
console.log('Recording performance data...');
const endTime = process.hrtime();
const endUsage = process.memoryUsage().heapUsed;
const elapsedTime = (endTime[0] - startTime[0]) * 1000 + (endTime[1] - startTime[1]) / 1e6;
const memoryUsed = (endUsage - startUsage) / 1024 / 1024;

// Write performance data to file
fs.writeFileSync('performance.txt', `Time to process: ${(elapsedTime / 1000 / 60).toFixed(0)} minutes ${(elapsedTime / 1000 % 60).toFixed(0)} seconds \nMemory used: ${memoryUsed.toFixed(2)} MB`);

console.log('Translation complete.');
