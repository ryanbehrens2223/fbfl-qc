import re

# hand = open('mbox-short.txt')
# for line in hand:
#     line = line.rstrip()
#     if line.find('From ') >= 0:
#         print(line)
# print("-------------------------------------------")

# hand2 = open('mbox-short.txt')
# for line2 in hand2:
#     line2 = line2.rstrip()
#     if re.findall('\$[0-9]+', line2):
#         print(line2)

# hand3 = open('mbox-short.txt')
random = """
Why should you learn to write programs? 7746
12 1929 8827
Writing programs (or programming) is a very creative 
7 and rewarding activity.  You can write programs for 
many reasons, ranging from making your living to solving
8837 a difficult data analysis problem to having fun to helping 128
someone else solve a problem.  This book assumes that 
everyone needs to know how to program ...
"""
numlist = list()
for line3 in random:
    line3 = line3.rstrip()
    stuff = re.findall('[0-9]+', line3)
    if len(stuff) != 1 : continue
    num = int(stuff[0])
    numlist.append(num)
print('Sum: ', sum(numlist))

# x = 'From: Using the : character'
# y = re.findall('\S+?@\S+', x)
# print(y)