import requests
import re
import sys


def main(url, file_name):
    js_data = requests.get(url, proxies={"http": None, "https": None}).text
    js_random_key = list(set(re.findall(re.compile(r'[1-9]\d*:"(.*?)"', re.S), js_data)))
    if len(js_random_key) > 0:
        for ikey in js_random_key:
            i = 0
            url = url[0:url.rfind('/') + 1] + file_name + "." + ikey + ".js"
            while i < 3:
                try:
                    status_code = requests.head(url, proxies={"http": None, "https": None}).status_code
                    if status_code == 200:
                        return "{0}.js : {1}".format(file_name, url)
                    else:
                        print("{0}.js is not : {1} is status_code : {2}".format(file_name, url, status_code))
                    break
                except requests.exceptions.RequestException:
                    i += 1


if __name__ == '__main__':
    if len(sys.argv) <= 2:
        file_name = 'app'
    else:
        file_name = sys.argv[2]
    print(main(sys.argv[1], file_name))
