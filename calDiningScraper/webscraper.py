'''
    $ source caldining-env/bin/activate: activate virtualenv
                           $ deactivate: deactivate virtualenv
'''

import requests
import bs4 as bs

source = requests.get('https://caldining.berkeley.edu/menu.php').content
soup = bs.BeautifulSoup(source,features='lxml')


node = soup.find_all("div", {"id": "node-177"})
for node_tag in node:
    content_tags = node_tag.find_all("div", {"class": "content"})
    for content_tag in content_tags:
        menu_tags = content_tag.find_all("div", {"class": "menu_wrap_overall"})
        for menu_tag in menu_tags:  
            # print(menu_tag.text)
            desc_tags = menu_tag.find_all("div", {"class": "desc_wrap_ck3"})
            for desc_tag in desc_tags:
                # print(desc_tag)
                for tag in desc_tag:
                    if tag.name == 'h3':
                        if tag.has_key('class'):
                            
                            if tag['class'][0] == 'location2':
                                print("\n\n")
                                print("----------------------")
                                print(tag.text)
                            if tag['class'][0] == 'location_period':                    
                                print(tag.text)
                                print("----------------------")
                    elif tag.name == 'p':
                        if tag.has_key('class'):
                            print()
                            print(tag.text)
                            print("------------")
                        else:
                            print(tag.text)
                        

                # para_tags = desc_tag.find_all("p")
                # for para_tag in para_tags:
                #     if para_tag.has_key('class'):
                #         print()
                #         print(para_tag.text)
                #         print("------------")
                #     else:
                #         print(para_tag.text)

                # section_tags = desc_tag.find_all("p", {"class": "station_wrap"})
                # for section_tag in section_tags:
                #     print(section_tag.text)
                    
                # para_tags = desc_tag.find_all("p")
                # for para_tag in para_tags:
                #     print(para_tag.text)


            # menu_tags = meal_tag.find_all("div", {"class": "menu_wrap_overall"})
            # for tag in menu_tags:
            #     print(tag.text)
        '''
        MEAL LOCATIONS
        meal_location_tags = tag.find_all("div", {"class": "meal_location"})
        for tag in meal_location_tags:  
            print(tag.text)

        MEAL DATES
        meal_dates_tags = content_tag.find_all("div", {"class": "meal_dates"})
        for meal_tag in meal_dates_tags:  
            print(meal_tag.text)
        '''
        
        # print(tag.text)


# divTag = soup.find_all("div", {"class": "tablebox"}):
# for tag in divTag:
#     tdTags = tag.find_all("td", {"class": "align-right"})
#     for tag in tdTags:
#         print tag.text

# node = soup.find(id='node-177')
# x = node.find(class='content')
# print(type(node))
# print(node.prettify())