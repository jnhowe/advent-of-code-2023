const readline = require('readline');
const fs = require('fs');

const TEST_STRING = `seeds: 2906422699 6916147 3075226163 146720986 689152391 244427042 279234546 382175449 1105311711 2036236 3650753915 127044950 3994686181 93904335 1450749684 123906789 2044765513 620379445 1609835129 60050954

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

function main() {
    // const input = fs.readFileSync("data.txt").toString();
    const input = TEST_STRING;
    const lines = input.split("\n");

    const seeds = lines[0].slice(7).split(" ").map((num) => parseInt(num));

    // for (let j = 0; j < seeds.length / 2; j++) {
    //     let cntr = seeds[2*j];
    //     const limit = cntr + seeds[2*j+1];

    //     while (cntr < limit) {
    //         newSeeds.push(cntr);
    //         cntr++;
    //         console.log(`${newSeeds.length}`)
    //         // console.log(`${cntr} < ${limit}`);
    //     }
    // }
    const tmp = []
    for (let seedPtr = 0; seedPtr < seeds.length / 2; seedPtr++) {
        const start = seeds[2*seedPtr];
        const end = start + seeds[2*seedPtr+1] - 1;
        // console.log(start, end)
        console.log(`length ${end - start + 1}`)
        const seedRange = Array.from({ length: end - start + 1 }, (_, idx) => start + idx)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line === "") continue;
            
            if (line.match(/map:/g)) {
                i++;
                let numArr = Array.from({ length: seedRange.length }, _ => -1);
                while (i < lines.length && lines[i] != ""){
                    const [dest, src, offset] = lines[i].split(" ").map((num) => parseInt(num));
                    for (let j = 0; j < seedRange.length; j++) {
                        const seed = seedRange[j];
                        if (seed >= src && seed < src + offset) {
                            numArr[j]  = seed - src + dest
                        }
                    }
                    i++;
                }
                
                for (let j = 0; j < seedRange.length; j++) {
                    if (numArr[j] !== -1) {
                        seedRange[j] = numArr[j];
                    }
                }
            }
        }
        const min = seedRange.reduce((min, curr) => min < curr? min: curr, Infinity)
        tmp.push(min);
    }

    console.log(tmp);
    console.log(Math.min(...tmp))
}

function processFile(filename, callback) {
    // Example: Replace 'example.txt' with your file's path
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity // To recognize both '\r\n' and '\n' as line endings
    });
    
    // Read the file line by line
    rl.on('line', (line) => {
        callback(line)
    });
    
    // Close the interface on stream end
    rl.on('close', () => {
        console.log('End of file');
    });
    
}

main()