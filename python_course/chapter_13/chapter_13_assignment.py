import urllib.request, urllib.parse, urllib.error
import xml.etree.ElementTree as ET

url = input('Enter URL: ')
print('Retriving', url)
html = urllib.request.urlopen(url).read()
print('Retrieved', len(html), 'characters')
xml = ET.fromstring(html)

xmlcount = xml.findall('.//count')

calc = 0
for count in xmlcount:
    calc = calc + int(count.text)

print('The sum for this assignment is', str(calc))