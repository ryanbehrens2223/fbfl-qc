import re

file = open('regex_sum_1296250.txt')

datalist = list()
total = 0
for line in file:
    line = line.rstrip()
    datapoint = re.findall('[0-9]+', line)
    if len(datapoint) == 0 : continue
    integer = [int(i) for i in datapoint]
    datalist.append(integer)
    total = total + sum(integer)
print("Total sum is", total)