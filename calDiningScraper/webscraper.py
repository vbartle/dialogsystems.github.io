'''
    $ source caldining-env/bin/activate: activate virtualenv
                           $ deactivate: deactivate virtualenv
'''

import requests
import bs4 as bs

source = requests.get('https://caldining.berkeley.edu/menu.php').content
soup = bs.BeautifulSoup(source,features='lxml')
forecast = soup.find(id='node-177')
print(forecast.prettify())