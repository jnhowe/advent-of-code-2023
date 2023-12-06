

import re

TEST_STRING = """467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598.."""

def find_num(arr, row, col, seen):
    left_ptr = col
    right_ptr = col

    while left_ptr - 1 >= 0 and arr[row][left_ptr-1].isdigit():
        seen[row][left_ptr-1] = True
        left_ptr -= 1

    while right_ptr + 1 < len(arr[0]) and arr[row][right_ptr+1].isdigit():
        seen[row][right_ptr+1] = True
        right_ptr += 1

    return int(arr[row][left_ptr:right_ptr+1])

def is_out_of_bounds(arr, row, col):
    return row < 0 or col < 0 or row >= len(arr) or col >= len(arr[0])

def find_nums(arr, row, col, seen):
    disp = [-1, 0, 1]
    nums = []
    for r_disp in disp:
        for c_disp in disp:
            currRow = row + r_disp
            currCol = col + c_disp

            if (currCol == row and currRow == row) or is_out_of_bounds(arr, currRow, currCol):
                continue

            if not seen[currRow][currCol] and arr[currRow][currCol].isdigit():
                num = find_num(arr, currRow, currCol, seen)   
                nums.append(num)

    return nums

def is_symbol(c):
    regex = r"[^a-zA-Z0-9.]"
    match = re.search(regex, c)
    return True if match else False

def main():
    file = open("data.txt", 'r')
    grid = file.read()
    # grid = TEST_STRING
    rows = grid.split("\n")
    row = len(rows)
    col = len(rows[0])
    seen = [[False for _ in range(col)] for _ in range(row)]
    total = 0

    for i in range(row):
        for j in range(col):
            c = rows[i][j]
            if is_symbol(c):
                nums = find_nums(rows, i, j, seen)
                if len(nums) == 2:
                    total += nums[0] * nums[1]

    print(f'Total: {total}')
    
    # file.close()

if __name__ == "__main__":
    main()