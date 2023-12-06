s = """two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen"""

stringToNum = {
    '0': '0',
    'zero': '0',
    '1': '1',
    'one': '1',
    '2': '2',
    'two': '2',
    '3': '3',
    'three': '3',
    '4': '4',
    'four': '4',
    '5': '5',
    'five': '5',
    '6': '6',
    'six': '6',
    '7': '7',
    'seven': '7',
    '8': '8',
    'eight': '8',
    '9': '9',
    'nine': '9'
}

def first_num(line, reverse=False):
    line_length = len(line)
    outer_loop = range(line_length+1,0,-1) if reverse else range(line_length)
    increment = -1 if reverse else 1
    end = -1 if reverse else line_length + 1

    for i in outer_loop:
        for j in range(i, end, increment):
            substring = line[j:i] if reverse else line[i:j]
            digit = stringToNum.get(substring, "")
            if digit != "":
                return digit
                

def getSum(lines):
    lines = lines.split('\n')
    total_sum = 0

    for line in lines:
        num = first_num(line) + first_num(line, reverse=True)
        total_sum += int(num)

    return total_sum

with open("data.txt", 'r') as file:
    data = file.read()
    print(getSum(data))

        