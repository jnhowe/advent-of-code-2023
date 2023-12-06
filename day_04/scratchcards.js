const { readFileSync } = require("fs");

// const TEST_SRING = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const TEST_STRING = `Card 184: 47  1 26 10 90 17 22  7 49 16 | 10  5 16 53 40 81  1  7 76 26  9 74 49 44 59 56 47 14 82 30 17 22 65 90 15`

function getCardPoints(card) {
    const [cardDetails, lists] = card.split(":");
    const [winningList, elfList] = lists.split("|");
    const winningSet = new Set(winningList.trim().split(/\s+/g));
    const elf_nums = elfList.trim().split(" ");
    let points = 0;

    let cnt = 0
    for (num of elf_nums) {
        if (winningSet.has(num)) {
            points = points === 0? 1: points * 2;
            console.log(num)
            cnt ++;
        }
    }
    console.log(cardDetails, points, cnt)
    return points;
}

function main() {
    const buffer = readFileSync("data.txt");
    const input = buffer.toString();
    // const input = TEST_STRING;
    let total = 0;

    const cards = input.split("\n");
    for (card of cards) {
        const points = getCardPoints(card);
        total += points;
    }

    console.log(`Total: ${total}`);
}

main()