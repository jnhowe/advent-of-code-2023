const fs = require("node:fs")

fs.readFile('data.txt', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    data = data.toString()
    getSum(data)
})

function isDigit(c) {
    return !isNaN(parseInt(c))
}

function getSum(data) {    
    const lines = data.split("\n")
    let sum = 0
    
    for (let line of lines) {
        let num = ""
        for (let i = 0; i < line.length; i++) {
            if (isDigit(line[i])) {
                num += line[i]
                break
            }
        }
        
        for (let i = line.length - 1; i >= 0; i--) {
            if (isDigit(line[i])) {
                num += line[i]
                break
            }
        }
        console.log(`line3: ${num}`)
        sum += parseInt(num)
    }
    console.log(`Sum: ${sum}`)
    return sum
}
    