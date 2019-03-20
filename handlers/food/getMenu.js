// WEB SCRAPER STUFF
var scraper = require('./webscraper');

const id = '#node-177'
const content = '.content'
const menu = '.menu_wrap_overall'

const baseUrl = 'https://caldining.berkeley.edu/';
const today = "menu"

let nameToDiningHall = {
    "cafe 3": "Cafe_3",
    "crossroads": "Crossroads",
    "clark Kerr": "Clark_Kerr_Campus",
    "foothill": "Foothill"
}

let nameToMeal = {
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "dinner": "Dinner",
    "brunch": "Brunch"
}

// default messages
const INVALID_DINING_HALL = "...But Sorry, I couldn't find the dining hall you were asking for";
const INVALID_MEAL = "...But Sorry, is this for breakfast, brunch, lunch or dinner?";
const NOT_SERVING_MEAL = "...But Sorry, I don't think that meal is served today";
const DINING_HALL_NOT_SERVING_FOOD = "...But Sorry, I don't think that dining hall is serving food today";

// input: takes in a diningHall and a meal 
// output: a string that's what alexa should read out
exports.getMenuByLocationAndMeal = function(diningHall, meal) {
    return new Promise(((resolve, reject) => {
        let diningHallKey = nameToDiningHall[diningHall]
        if (diningHallKey == undefined) {
            resolve(INVALID_DINING_HALL);
        } else if (meal != "breakfast" && meal != "lunch" && meal != "dinner" && meal != "brunch") {
            resolve(INVALID_MEAL);
        }
        scraper.scrapeMenu(today, function(mealsInfo) {
            let hallMenu = mealsInfo[diningHallKey];
            if (hallMenu != undefined) {
                let mealKey = nameToMeal[meal]
                var menu = hallMenu[mealKey];
                if (menu != undefined) {
                    var mealDescription = "For " + meal + " we have"
                    
                    for (var section in menu) {
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
                } else {
                    resolve(NOT_SERVING_MEAL);
                }
            } else {
                resolve(DINING_HALL_NOT_SERVING_FOOD);
            }
        });

    }));
}
