#!/usr/bin/env node
const fs = require('fs')
const AVILABLE_FUNC = ['-n', '-b', '-s' ]

const COMMAND = process.argv.slice(2)

const INPUT_FILE = []
const FUNC = []


for(let i = 0;i < COMMAND.length; i++) { 
    if(COMMAND[i].charAt(0) === '-') {
        if(AVILABLE_FUNC.includes(COMMAND[i])) {
            FUNC.push(COMMAND[i])
        } else {
            console.log(`-${COMMAND[i].slice(1)} IS NOT AVILABLE`)
            return
        }
    } else {
        if(fs.existsSync(COMMAND[i])) {
            INPUT_FILE.push(COMMAND[i])
        } else {
            console.log(`FILE \"${COMMAND[i].slice(1)}\" DOESN'T EXISTS`)
            return
        }
    }
}

// Reading the Text inside the file....
let TEXT_FILE = ""
for(let i = 0;i < INPUT_FILE.length; i++) {
    let temp = fs.readFileSync(INPUT_FILE[i]) + ""
    TEXT_FILE += temp + '\n' 
}

// FUNCTION....
for(let i = 0;i < FUNC.length; i++) {
    TEXT_FILE = func(TEXT_FILE, FUNC[i])
}
console.log(TEXT_FILE)

function func(text, func) {
    if(func === '-n') {
        let tempArr = text.split('\n') 
        text = ""
        for(let i = 0;i < tempArr.length; i++) {
            if(i > 0 && i < 10) {
                text += (i+1) + "  " + tempArr[i] + "\n"
            } else {
                text += (i+1) + " " + tempArr[i] + "\n"
            }
        }
    } else if(func === '-b') {
        let tempArr = text.split('\n') 
        let counter = 1
        text = ""
        for(let i = 0;i < tempArr.length; i++) {
            if(tempArr[i] != '') {
                if(counter > 0 && counter < 10) {
                    text += counter + "  " + tempArr[i] + "\n"
                } else {
                    text += counter + " " + tempArr[i] + "\n"
                }
                counter++
            } else {
               text += '\n'
            }
        }
    } else if(func === '-s') {
        let tempArr = text.split('\n') 
        let arr = []
        for(let i = 1;i < tempArr.length; i++) {
            if(tempArr[i] == '' && tempArr[i-1] == '') {
                tempArr[i] = null
            } else if(tempArr[i] == '' && tempArr[i-1] == null) {
                tempArr[i] = null
            } 
        }
        for(let i = 0;i < tempArr.length; i++) {
            if(tempArr[i] != null) {
                arr.push(tempArr[i])
            }
        }
        text = arr.join('\n')
    }

    return text 
}
