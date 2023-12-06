const { readFilereadFileSync } = require("fs");

const TEST_STRING = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

function initialSeenArray(row, col) {
    let arr = []
    for (let i = 0; i < row; i++) {
        arr[i] = []
        for (let j = 0; j < col; j++) {
            arr[i][j] = false;
        }
    }

    const altArr = Array.from({ length: row }, () => Array.from({ length: col }, () => false))
    return altArr
}

function isDigit(str) {
    return !isNaN(parseInt(str));
}

function findNum(arr, row, col, seen) {
    let leftPtr = col;
    let rightPtr = col;

    while (leftPtr-1 >= 0 && isDigit(arr[row][leftPtr-1])) {
        seen[row][leftPtr-1] = true;
        leftPtr--;
    }

    while (rightPtr+1 < arr[0].length && isDigit(arr[row][rightPtr+1])) {
        seen[row][rightPtr+1] = true;
        rightPtr++;
    }

    return parseInt(arr[row].substring(leftPtr, rightPtr + 1));
}
function isOutOfBounds(arr, row, col) {
    return (row < 0 || col < 0 || row >= arr.length || col >= arr[0].length);
}

function findNums(arr, row, col, seen) {
    let nums = []
    const disp = [-1, 0, 1]
    for (rowDisp of disp) {
        for (colDisp of disp) {
            if (rowDisp === 0 && colDisp === 0) continue
            
            const currRow = row + rowDisp;
            const currCol = col + colDisp;
            if (isOutOfBounds(arr, currRow, currCol)) continue;
            
            if (!seen[currRow][currCol] && isDigit(arr[currRow][currCol])) {
                nums.push(findNum(arr, currRow, currCol, seen));
            }
        }
    }

    return nums;
}

function isSymbol(c) {
    const regex = /[^a-zA-Z0-9.]/;
    return regex.test(c);
}

async function main() {
    const file = readFileSync("data.txt");
    // const grid = TEST_STRING;
    const grid = file.toString();
    const rows = grid.split('\n');
    const row = rows.length;
    const col = rows[0].length;
    let seen = initialSeenArray(row, col);

    total = 0;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            let c = rows[i][j];
            if (isSymbol(c)) {
                const nums = findNums(rows, i, j, seen);
                for (num of nums) {
                    total += num;
                }
            }
        }
    }
    console.log(`Total: ${total}`);
}

main()