// WEB SCRAPER STUFF
var scraper = require('./webscraper');

const id = '#node-177'
const content = '.content'
const menu = '.menu_wrap_overall'

const baseUrl = 'https://caldining.berkeley.edu/';
const today = "menu"

let nameToDiningHall = {
    "Cafe 3": "Cafe_3",
    "Crossroads": "Crossroads",
    "Clark Kerr": "Clark_Kerr_Campus",
    "Foothill": "Foothill"
}
// input: takes in a diningHall and a meal 
// output: a string that's what alexa should read out
exports.getMenuByLocationAndMeal = function (diningHall, meal, callback) {
    let diningHallKey = nameToDiningHall[diningHall]
    if (diningHallKey == undefined) {
        callback("...But Sorry, I couldn't find the dining hall you were asking for");
    } else if (meal != "Breakfast" && meal != "Lunch" && meal != "Dinner" && meal != "Brunch") {
        callback("...But Sorry, is this for breakfast, brunch, lunch or dinner?");
    }

    scraper.scrapeMenu(today, function(mealsInfo) {
        let hallMenu = mealsInfo[diningHallKey]
        if (hallMenu != undefined) {
            var menu = hallMenu[meal]
            if (menu != undefined) {
                callback(menu)
            } else {
                callback("...But Sorry, I don't think that meal is served today");    
            }
        } else {
            callback("...But Sorry, I don't think that dining hall is serving food today");
        }
    });
}


