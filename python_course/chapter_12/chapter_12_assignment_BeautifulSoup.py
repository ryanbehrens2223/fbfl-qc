import urllib.request, urllib.parse, urllib.error
from bs4 import BeautifulSoup
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urllist = list()
visited = list()

url = input('Enter URL: ')
visited.append(url)
count = int(input('Enter count: '))
position = int(input('Enter position: '))-1
html = urllib.request.urlopen(url, context=ctx).read()

soup = BeautifulSoup(html, 'html.parser')
tags = soup('a')

for i in range(count):
    references = tags[position].get('href', None)
    visited.append(tags[position].contents[0])
    html = urllib.request.urlopen(references, context=ctx).read()
    soup = BeautifulSoup(html, 'html.parser')
    tags = soup('a')
    references = tags[position].get('href', None)
print('Last name in sequence:', visited[-1])