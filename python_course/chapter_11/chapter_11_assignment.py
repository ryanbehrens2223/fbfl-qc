import re

file = open('regex_sum_42.txt')
datalist = list()
for line in file:
    line = line.rstrip()
    datapoint = re.findall('[0-9]+', line)
    if len(datapoint) != 1 : continue
    integer = int(datapoint[0])
    print(integer)
    datalist.append(integer)
print('Sum: ', sum(datalist))
