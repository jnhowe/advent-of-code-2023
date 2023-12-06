const fs = require("fs");

const testString = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

function isGamePossible(game, colourCount) {
    const validateColour = (pattern, colour) => {
        const counts = game.match(pattern).map(match => match.match(/\d+/)[0]) || [];
        return counts.every(count => count <= colourCount[colour])
    }
    const bluePattern = /\d+ blue/g;
    const greenPattern = /\d+ green/g;
    const redPattern = /\d+ red/g;

    const validBlueCount = validateColour(bluePattern, "blue");
    const validGreenCount = validateColour(greenPattern, "green");
    const validRedCount = validateColour(redPattern, "red");

    return validBlueCount && validGreenCount && validRedCount
}

function getPossibleGames(data, colourCount){
    const gamePattern = /\d+/;
    const lines = data.split("\n");
    const games = [];

    for (line of lines) {
        if (isGamePossible(line, colourCount)) {
            const gameNum = line.match(gamePattern)
            games.push(gameNum)
        }
    }

    return games
}

function main(){
    colourCount = {"blue": 14, "green": 13, "red": 12}
    const data = fs.readFileSync("data.txt");

    const possibleGames = getPossibleGames(data.toString(), colourCount);
    const total = possibleGames.reduce((sum, num) => sum + parseInt(num), 0);
    console.log('total', total)
}

main()