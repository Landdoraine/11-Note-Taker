const fs = require('fs').promises;

const readFromFile = async (file) => {
  return await fs.readFile(file, 'utf8');
};

const writeToFile = async (destination, content) => {
  await fs.writeFile(destination, JSON.stringify(content, null, 4));
  console.info(`Data written to ${destination}`);
};

const readAndAppend = async (content, file) => {
  const existingData = await readFromFile(file);
  const parsedData = JSON.parse(existingData);
  parsedData.push(content);
  await writeToFile(file, parsedData);
};

module.exports = { readFromFile, writeToFile, readAndAppend };