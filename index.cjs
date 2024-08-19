#!/usr/bin/env node

const fs = require("fs");
const cfonts = require("cfonts");
const path = require("path");

// Constants
const AVAILABLE_FUNC = ["-n", "-b", "-s"];
const VERSION = "2.1.0";

// Retrieve command-line arguments
const args = process.argv.slice(2);

// Initialize arrays for options and files
const inputFiles = [];
const functions = [];

// Display version information
if (args.includes("--version")) {
  cfonts.say(`wcat-command|version ${VERSION}`, {
    font: "",
    align: "center",
    colors: ["system"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    rawMode: false,
    env: "node",
  });
  process.exit(0);
}

// Process arguments
args.forEach((arg) => {
  if (arg.startsWith("-")) {
    if (AVAILABLE_FUNC.includes(arg)) {
      functions.push(arg);
    } else {
      console.error(`Error: ${arg} is not a valid option.`);
      process.exit(1);
    }
  } else {
    if (fs.existsSync(arg) && fs.statSync(arg).isFile()) {
      inputFiles.push(arg);
    } else {
      console.error(`Error: File "${arg}" does not exist.`);
      process.exit(1);
    }
  }
});

// Read and process text from files
let text = "";
inputFiles.forEach((file) => {
  try {
    const fileContent = fs.readFileSync(file, "utf8");
    text += fileContent + "\n";
  } catch (error) {
    console.error(`Error reading file "${file}": ${error.message}`);
    process.exit(1);
  }
});

// Apply functions to the text
functions.forEach((func) => {
  text = applyFunction(text, func);
});

console.log(text);

// Function to apply text transformations
function applyFunction(text, func) {
  switch (func) {
    case "-n":
      return text.split("\n").map((line, index) => `${index + 1} ${line}`).join(
        "\n",
      );
    case "-b":
      let counter = 1;
      return text.split("\n").map((line) => {
        if (line.trim()) {
          return `${counter++} ${line}`;
        }
        return line;
      }).join("\n");
    case "-s":
      return text.split("\n").filter((line, index, arr) =>
        !(line.trim() === "" &&
          (arr[index - 1] === "" || arr[index - 1] === undefined))
      ).join("\n");
    default:
      return text;
  }
}
