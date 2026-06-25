import json, urllib.request, urllib.error, sys

def post(url, data):
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type':'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            print('POST', url, '->', r.status)
            print(r.read().decode())
    except urllib.error.HTTPError as e:
        print('POST', url, 'HTTPError', e.code)
        try:
            print(e.read().decode())
        except Exception:
            pass
    except Exception as e:
        print('POST', url, 'ERR', e)


def get(url):
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            print('GET', url, '->', r.status)
            print(r.read().decode())
    except Exception as e:
        print('GET', url, 'ERR', e)


if __name__=='__main__':
    base='http://127.0.0.1:8000/api'
    get(base+'/stores/')
