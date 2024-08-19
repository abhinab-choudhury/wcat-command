<div style="display:flex;">
  <img style="margin-left:20px;" width="100" height="100" src="https://img.icons8.com/fluency/48/node-js.png" alt="nodejs"/>
  <img style="margin-left:20px;"  width="100" height="100" src="https://img.icons8.com/fluency/100/linux-terminal.png" alt="linux-terminal"/>
</div>

# wcat-command

**wcat-command** is a powerful CLI tool for displaying and manipulating file content directly in the terminal. It allows you to view and process files with various options for formatting and redirection.


## Features

- Display content of one or more files.
- Format output with line numbers or compact line breaks.
- Redirect output to files with options to overwrite or append.

## Installation

### Clone the Repository

Open your terminal and clone the repository:

```bash
git clone https://github.com/abhinab-choudhury/wcat-command.git
```

### Navigate to Directory

Change into the project directory:

```bash
cd wcat-command
```

### Make Script Executable

Ensure the script is executable:

```bash
chmod +x index.cjs
```

### Link Globally

Install the CLI tool globally for testing:

```bash
npm link
```

## Usage

### Basic Commands

- **Display File Content**:

  ```bash
  wcat filepath
  ```

  Displays the content of the specified file in the terminal.

- **Display Multiple Files**:

  ```bash
  wcat filepath1 filepath2 filepath3...
  ```

  Concatenates and displays the content of multiple files in the specified order.

### Options

- **Convert Multiple Line Breaks to a Single Line Break**:

  ```bash
  wcat -s filepath
  ```

  Removes extra blank lines, leaving only single line breaks.

- **Number All Lines**:

  ```bash
  wcat -n filepath
  ```

  Adds line numbers to every line in the output.

- **Number Non-Empty Lines**:

  ```bash
  wcat -b filepath
  ```

  Adds line numbers only to non-empty lines in the output.

### Redirection

- **Overwrite File**: Redirect output to a file, creating it if it doesn't exist.

  ```bash
  wcat filepath > filename2path
  ```

- **Append to File**: Append output to an existing file.

  ```bash
  wcat filepath >> filename2path
  ```

- **Remove Large Spaces and Save**:

  ```bash
  node wcat -s filename > filename2
  ```

  Processes the file to remove extra spaces and saves the output to another file.

### Mixing Options

You can combine options to tailor the output to your needs. For example:

```bash
wcat -n -s filepath > filename2path
```

This command numbers all lines and removes extra line breaks, saving the result to `filename2path`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
