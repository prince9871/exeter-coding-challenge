# Project-TranslationApp

## Introduction
This is a Node.js application that translates English words in a given text file to French using a pre-defined dictionary of translations. It also provides frequency data for each converted word.

## Translation Workflow
Follow the below steps to understand the translation workflow.

1. Import the required modules:
   - `fs` for file system operations
2. Record the start time and memory usage using `process.memoryUsage()` and `process.hrtime()` methods.
3. Read input files: 
   - Original text file (`t8.shakespeare.txt`)
   - List of words to find translations for (`find_words.txt`)
   - Translation dictionary (`french_dictionary.csv`)
4. Convert the translation dictionary CSV data to a Map for easy lookup:
   - Split each row into columns by comma separator
   - Filter out any rows where either English or French word is missing
   - Convert English words to lowercase
   - Create a new Map with English as key and French as value
   - This produces a Map object with English words as keys and their corresponding French translations as values.
5. Loop through each word in the list of words to find translations for:
   - Create a regular expression to find all occurrences of the current word in the original text.
   - Look up the French translation for the current word in the translation dictionary.
   - If there is a French translation for the current word:
     - Replace all occurrences of the English word with the French word in the original text and record the frequency of the substitution.
     - Store the English word and its frequency in a Map object.
6. Write the translated text to a new file (`t8.shakespeare.translated.txt`) and write the frequency data to a CSV file (`frequency.csv`) using the `fs.writeFileSync()` and `fs.appendFileSync()` methods.
7. Record the end time, memory usage, and calculate the elapsed time using `process.hrtime()` and `process.memoryUsage()` methods.
8. Write performance data to file `performance.txt`.
9. The translation process is complete.

Note that this code assumes that the input files are present in the same directory as the script, and that the translation dictionary is formatted as a CSV file with two columns (English and French) and no header row.

## Key Features
- Translates English words in a given text file to French using a pre-defined dictionary
- Provides frequency data for each translated word
- Writes the translated text to a new file and saves the frequency data to a CSV file
- Uses Node.js module `fs` to handle file system operations

## Usage
1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install` on the command line.
3. Ensure that the input files (`t8.shakespeare.txt`, `find_words.txt`, and `french_dictionary.csv`) are present in the same directory as the script.
4. Run the following command: `node translate.js`
5. Check the output files (`t8.shakespeare.translated.txt`, `frequency.csv`, and `performance.txt`) to see the translated text, frequency data, and performance metrics.

## Author
This project was created by Prince Soni. You can find me on [LinkedIn](https://linkedin.com/in/prince9871) and [GitHub](https://github.com/prince9871).

## Conclusion
This translation app showcases some advanced JavaScript concepts and makes use of Node.js's powerful built-in modules such as `fs`. It demonstrates how to handle file system operations and stream processing for efficient translation of large files.