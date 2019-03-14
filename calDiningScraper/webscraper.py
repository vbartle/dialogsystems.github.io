'''
    $ source caldining-env/bin/activate: activate virtualenv
                           $ deactivate: deactivate virtualenv
'''

import pprint
import requests
import bs4 as bs


'''

menu.php - returns the menu for the current date, whatever that might be
menu
menu_day2.php - returns the menu for current date + 1, whatever that might be
Works for menu_day3, menu_day4

menu_day5 - menu_day7 technical exists, but no data is available for that
'''
menu = {}

today = "menu"
today_plus_one = "menu_day2"
today_plus_two = "menu_day3"
today_plus_three = "menu_day4"

base_url = 'https://caldining.berkeley.edu/'
final_url = base_url + today + '.php'

source = requests.get(final_url).content
soup = bs.BeautifulSoup(source,features='lxml')
node = soup.find_all("div", {"id": "node-177"})


curr_location = ""
curr_meal = ""
curr_section = ""
for node_tag in node:
    content_tags = node_tag.find_all("div", {"class": "content"})
    for content_tag in content_tags:
        menu_tags = content_tag.find_all("div", {"class": "menu_wrap_overall"})
        for menu_tag in menu_tags:  
            desc_tags = menu_tag.find_all("div", {"class": "desc_wrap_ck3"})
            for desc_tag in desc_tags:
                for tag in desc_tag:
                    if tag.name == 'h3':
                        if tag.has_attr('class'):
                            if tag['class'][0] == 'location2':
                                curr_location = tag.text
                                if curr_location not in menu:
                                    menu[curr_location] = {}
                                
                                # print("\n\n")
                                # print("----------------------")
                                # print(curr_location)
                            if tag['class'][0] == 'location_period':                   
                                curr_meal = tag.text
                                if curr_meal not in menu[curr_location]:
                                    menu[curr_location][curr_meal] = {}
                                
                                # print(curr_meal)
                                # print("----------------------")
                    elif tag.name == 'p':
                        if tag.has_attr('class'):
                            curr_section = tag.text
                            if curr_section not in menu[curr_location][curr_meal]:
                                menu[curr_location][curr_meal][curr_section] = []
                            
                            # print()
                            # print(tag.text)
                            # print("------------")
                        else:
                            menu[curr_location][curr_meal][curr_section].append(tag.text)
                            # print(tag.text)
                        

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

pp = pprint.PrettyPrinter(indent=1)
pp.pprint(menu)