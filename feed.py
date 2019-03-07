import sys
import json
import numpy as np
import pandas as pd
import requests

def feed_api(entries, keys):

    for entry in entries:
        for key in keys:
            print('key %s data %s' % (key, entry[key]))
            #requests.post('localhost:8000/%s',)
        return 0

if __name__ == "__main__":
    # Reading and doing some processing
    entries = json.load(open(sys.argv[1], mode='r+', encoding='utf-8'))
    keys = entries[0].keys()
    print('Number of entries %d\nKeys of the json entries %s' %
          (len(entries), keys))
    
    # Feed to the db
    feed_api(entries, ['airport', 'carrier'])
