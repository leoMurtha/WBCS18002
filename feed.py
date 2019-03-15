import sys
import json
import numpy as np
import pandas as pd
import requests

def feed_api(entries, keys):

    for entry in entries:
        requests.post(url='http://127.0.0.1:8000/api/carriers/', data=entry['carrier'])
        
        data = entry['airport']

        data.update({'carriers': ['http://127.0.0.1:8000/api/carriers/%s/' % entry['carrier']['code']]})

        print(data)
        
        r = requests.post('http://localhost:8000/api/airports/', data=data)
        if r.status_code != 200:
            requests.patch('http://localhost:8000/api/airports/%s/' % data['code'], data=data)
        #return 0

if __name__ == "__main__":
    # Reading and doing some processing
    entries = json.load(open(sys.argv[1], mode='r+', encoding='utf-8'))
    keys = entries[0].keys()
    print('Number of entries %d\nKeys of the json entries %s' %
          (len(entries), keys))
    
    # Feed to the db
    feed_api(entries, ['airport'])
