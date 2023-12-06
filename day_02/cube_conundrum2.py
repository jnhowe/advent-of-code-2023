import re

TEST_STRING = """Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"""

def get_min_set(game):
    def get_min(pattern):
        matches = re.findall(pattern, game)
        matches_as_int = [int(num) for num in matches]
        return max(matches_as_int)

    blue_pattern = r'(\d+) blue'
    green_pattern = r'(\d+) green'
    red_pattern = r'(\d+) red'
    colourPatterns = [blue_pattern, green_pattern, red_pattern]    

    return [get_min(pattern) for pattern in colourPatterns]


def main():
    file = open("data.txt", "r")
    data = file.read()
    # data = TEST_STRING
    games = data.split("\n")
    total = 0

    for game in games:
        min_set = get_min_set(game)
        power = 1
        for num in min_set:
            power *= num
        total += power

    print(f'Total: {total}')
    
    file.close()
            

if __name__ == "__main__":
    main()