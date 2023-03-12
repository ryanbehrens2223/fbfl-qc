import urllib.request, urllib.parse, urllib.error
from bs4 import BeautifulSoup
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = input('Enter: ')
html = urllib.request.urlopen(url, context=ctx).read()
soup = BeautifulSoup(html, 'html.parser')

tags = soup('span')
datalist = list()
total = 0
for tag in tags:
    content = tag.contents[0]
    intcontent = int(content)
    datalist.append(intcontent)
    total =  total + intcontent
print('Here is the sum of the content:', total)