import urllib.request, urllib.parse, urllib.error
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

address = input('Enter location: ')

parms = dict()
parms['address'] = address

print('Retrieving', address)
uh = urllib.request.urlopen(address, context=ctx)
data = uh.read().decode()
print('Retrieved', len(data), 'characters')

info = json.loads(data)
calc = 0

for item in info['comments']:
    getcount = item['count']
    calc = calc + int(getcount)
print('Here is the sum:', calc)