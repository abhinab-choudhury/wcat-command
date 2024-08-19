#!/usr/bin/env node

const fs = require("fs");
const cfonts = require("cfonts");
const path = require("path");

// Constants
const AVAILABLE_FUNC = ["-n", "-b", "-s"];
const VERSION = "2.1.1";

// Retrieve command-line arguments
const args = process.argv.slice(2);

// Initialize arrays for options and files
const inputFiles = [];
const functions = [];

// Display version information
if (
  args.includes("--version") || args.includes("--ver") || args.includes("-v")
) {
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

//help command
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
    Usage: wcat [options] <file ...>

    wcat is a command-line tool to display, concatenate, and manipulate file contents. It supports various options for transforming file output in the terminal.

    Options:
      -n                         Number all output lines.
      -b                         Number non-empty output lines only.
      -s                         Squeeze multiple adjacent empty lines into a single blank line.
      --version, --ver, -v       Show the version of wcat.
      --help, -h                 Show this help menu.

    Examples:
      wcat file.txt              Display the contents of file.txt.
      wcat file1.txt file2.txt   Concatenate and display contents of file1.txt and file2.txt.
      wcat -n file.txt           Number all lines of file.txt.
      wcat -b file.txt           Number non-empty lines of file.txt.
      wcat -s file.txt           Remove consecutive blank lines from file.txt.
      wcat -s -n file.txt        Remove consecutive blank lines and number all lines.

    Additional Features:
      >  wcat file.txt > output.txt    Redirect the output to a new file (overwrites if exists).
      >> wcat file.txt >> output.txt   Append the output to an existing file.
  `);
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
