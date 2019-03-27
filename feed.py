import sys
import json
import numpy as np
import pandas as pd
import requests
import multiprocessing as mp


def feed_api(entries, host='http://127.0.0.1:8000'):
    print('PROCESS %s"' %
          (mp.process.current_process()))

    count = 1
    total = len(entries)
    for entry in entries:
        print('=====================================================================================\n[PROCESS %s]: Fed %s of %s' %
              (mp.process.current_process(), count, total))

        post = requests.post(
            url='%s/api/carriers/' % (host), data=entry['carrier'])
        print('POST Carrier Return: %s' % post.text)

        post = requests.post(
            url='%s/api/airports/' % (host), data=entry['airport'])
        print('POST Airport Return: %s' % post.text)

        # Getting the right date
        time = entry.pop('time')
        entry['month'] = time['month']
        entry['year'] = time['year']

        # Linking airport and carrier
        entry['airport'] = entry['airport']['code']
        entry['carrier'] = entry['carrier']['code']

        # Unesting the statistics and renaming the key
        statistics = entry.pop('statistics')
        entry['flight'] = statistics.pop('flights')
        entry['delay_time'] = statistics.pop('minutes delayed')
        entry['delay_count'] = statistics.pop('# of delays')

        #entry = json.dumps(entry)

        post = requests.post(
            url='%s/api/statistics/' % (host), json=entry)
        print('POST Statistic Return: %s' % post.text)

        count += 1
        print('=====================================================================================')


def feed_parallel(data, host='http://127.0.0.1:8000', nproc=12):
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
                process_data, host))
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

    # Feed to the db
    host = sys.argv[2]
    print(host)
    feed_parallel(entries, host=host)
