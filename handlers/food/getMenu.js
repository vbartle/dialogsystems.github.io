// WEB SCRAPER STUFF
var scraper = require('./webscraper');

// CONSTANTS FOR SCRAPER
const id = '#node-177'
const content = '.content'
const menu = '.menu_wrap_overall'

// URLS TO SCRAPER
const baseUrl = 'https://caldining.berkeley.edu/';
const today = "menu"
// TODO: support asking for up to 3 days from the current date

// mapping what the user say to the key in the dictionary
// TODO: temporary fix, going to fix this later
let nameToDiningHall = {
    "cafe 3": "Cafe_3",
    "crossroads": "Crossroads",
    "clark Kerr": "Clark_Kerr_Campus",
    "foothill": "Foothill"
}

// mapping what the user say to the key in the dictionary
// TODO: temporary fix, going to fix this later
let nameToMeal = {
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "dinner": "Dinner",
    "brunch": "Brunch"
}

// DEFAULT MESSAGES FOR INVALID RESPONSES
const INVALID_DINING_HALL = "...but sorry, I couldn't find the dining hall you were asking for";
const INVALID_MEAL = "...but sorry, is this for breakfast, brunch, lunch or dinner?";
const NOT_SERVING_MEAL = "...but sorry, I don't think that meal is served today";
const DINING_HALL_NOT_SERVING_FOOD = "...but sorry, I don't think that dining hall is serving food today";

// INPUT: takes in a diningHall and a meal 
// OUTPUT: returns a promise that resolves to a string that Alexa can reach out
exports.getMenuByLocationAndMeal = function(diningHall, meal) {
    return new Promise(((resolve, reject) => {
        let diningHallKey = nameToDiningHall[diningHall]
        
        // enforce that a valid dininghall that is a key to a value in the nameToDiningHall struct above is specified
        if (diningHallKey == undefined) {
            resolve(INVALID_DINING_HALL);

        // enforce that a valid dininghall that is a key to a value in the nameTomeal struct above is specified
        } else if (meal != "breakfast" && meal != "lunch" && meal != "dinner" && meal != "brunch") {
            resolve(INVALID_MEAL);
        }

        //scrape menu. Function found in webscraper.js
        //currently implemtned with a callback
        // TODO: change to promise to conform to pattern of codebase
        scraper.scrapeMenu(today, function(mealsInfo) {
            let hallMenu = mealsInfo[diningHallKey];
            if (hallMenu != undefined) {
                let mealKey = nameToMeal[meal]
                var menu = hallMenu[mealKey];
                if (menu != undefined) {
                    var mealDescription = "For " + meal + " we have"
                    
                    // construct the string that alexa will read out if a valid response is returned
                    for (var section in menu) {
                        // foodList is grouped into sections
                        foodList = menu[section];
                        foodList.forEach(function(food) {
                            // handle some edge cases when the menu sometimes has this
                            if (food == "Please note this menu is subject to change.") {
                                return;
                            } else if (food == "Thank you!") {
                                return;
                            }

                            mealDescription += " " + food + ", ";
                        });
                    }
                    mealDescription =  mealDescription.substring(0, mealDescription.length - 2) + "."
                    resolve(mealDescription);
                } else {    // handle case where dining hall asked for does not serve the meal asked for
                    resolve(NOT_SERVING_MEAL);
                }        
            } else {     // handle case where dining hall asked for is not serving food for the day
                resolve(DINING_HALL_NOT_SERVING_FOOD);
            }
        });

    }));
}
