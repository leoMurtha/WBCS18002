import sys
import json
import numpy as np
import pandas as pd
import requests
import multiprocessing as mp

def feed_api(entries):
    print('PROCESS %s"' %
          (mp.process.current_process()))

    count = 1
    total = len(entries)
    for entry in entries:
        print('=====================================================================================\n[PROCESS %s]: Fed %s of %s' %
              (mp.process.current_process(), count, total))
        for carrier in entry['carriers']:
            post = requests.post(url='http://127.0.0.1:8000/api/carriers/', data=entry['carrier'])
            print('POST Return: %s' % post.text)
        
        r = requests.post('http://localhost:8000/api/airports/', data=data)
        if r.status_code != 200:
            requests.put('http://localhost:8000/api/airports/%s/' % entry, data=data)
        
        print('Airport Return: %s' % r.text)
        

        count += 1
        print('=====================================================================================')

def feed_parallel(data, nproc=6):
    """
    """

    PROCESS = []

    try:
        print('Started parallel feeding pipeline...')

        total = len(data)

        work = int(total / nproc)

        print('Total: %s\nPerWorker:%s' % (total, work))

        for i in range(nproc):
            if i + 1 == nproc:
                process_data = data[i*work: total]
            else:
                process_data = data[i*work: work + i*work]

            process = mp.Process(target=feed_api, name=i, args=(
                process_data,))
            process.start()
            PROCESS.append(process)

        for p in PROCESS:
            p.join()

    except Exception as ex:
        print(ex)


if __name__ == "__main__":
    # Reading and doing some processing
    entries = json.load(open(sys.argv[1], mode='r+', encoding='utf-8'))
    keys = entries[0].keys()
    print('Number of entries %d\nKeys of the json entries %s' %
          (len(entries), keys))
    
    data = {}
    for entry in entries:
        airport = entry['airport']
            
        if airport['code'] in data:
            data[airport['code']]['carriers'].append(entry['carrier'])
        else:
            airport.update({'carriers': [entry['carrier']]})
            data.update({airport['code']: airport})

    # Feed to the db
    feed_parallel(data)