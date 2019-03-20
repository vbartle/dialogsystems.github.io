// WEB SCRAPER STUFF
var request = require('request');
var cheerio = require('cheerio');

// using exports.scrapeMenu to stay consistent with Ingrid's pattern in getMenu.js
exports.scrapeMenu = function (day, callback) {
    var mealsInfo = {}
    const finalUrl = baseUrl + day + '.php';

    request(finalUrl, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            let menuTags = $(id).find(content).find(menu)
            let text = menuTags.text()
            arrayOfMeals = text.match(/[^\r\n]+/g);
    
            arrayOfMeals.forEach(function(data) {
                let location = data.match(/^\s*\S+\s+/g)[0].trim();
                data = data.replace(location, "");
                let mealPeriod = data.match(/^\s*\S+\s+/g)[0].trim();
                data = data.replace(mealPeriod, "");
    
                let splitByTwoSpaces = data.split(/\s{2}/g);
                let splitProper = []
                splitByTwoSpaces.forEach(function(str) {
                    let proper = str.match(/zBREAKFAST|([A-Z]+ )*[A-Z]{2,}|([^\s]+ )*[^\s]+/g)
                    splitProper.push.apply(splitProper, proper)
                });
                
                var meal = {}
                let currSection = ""
                splitProper.forEach(function(word) {
                    if (word == 'zBREAKFAST') {
                        currSection = 'BREAKFAST'
                    } else if (isSection(word)) {
                        currSection = word
                    } else {
                        if (!meal.hasOwnProperty(currSection)) {
                            meal[currSection] = []
                        }
                        meal[currSection].push(word)
                    }
                });
    
                if (!mealsInfo.hasOwnProperty(location)){
                    mealsInfo[location] = {}
                }
                mealsInfo[location][mealPeriod] = meal
            });
            callback(mealsInfo)
        } else {
        }
    });
}

function isSection(word) {
    return word.match(/([A-Z]+ )*[A-Z]{2,}/g) != null
}

// EXPRESS STUFF
const express = require('express')
const port = process.env.PORT || 8000

const id = '#node-177'
const content = '.content'
const menu = '.menu_wrap_overall'

const baseUrl = 'https://caldining.berkeley.edu/';
const today = "menu"
const today_plus_one = "menu_day2"
const today_plus_two = "menu_day3"
const today_plus_three = "menu_day4"

// EVERYTHING BELOW HERE IS NOT REQUIRED FOR THE ALEXA APP
// PRESENT FOR TESTING PURPOSES

const app = express()

app.get('/', function (req, res) {
    return res.status(200).json({
        "Get today's menu": "/plusZero",
        "Get tomorrow's menu": "/plusOne",
        "Get 2 days' later's menu": "/plusTwo",
        "Get 3 days' later's menu": "/plusThree",
    })
});

// Get the Json of today's menu
app.get('/plusZero', function (req, res) {
    exports.scrapeMenu(today, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

// Get the Json of today + 1 days' menu
app.get('/plusOne', function (req, res) {
    exports.scrapeMenu(today_plus_one, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

// Get the Json of today + 2 days' menu
app.get('/plusTwo', function (req, res) {
    exports.scrapeMenu(today_plus_two, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

// Get the Json of today + 3 days' menu
app.get('/plusThree', function (req, res) {
    exports.scrapeMenu(today_plus_three, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

// TESTING
let getMenuByLocationAndMeal = require('./getMenu').getMenuByLocationAndMeal
app.get('/test', function (req, res) {
    getMenuByLocationAndMeal("feoa 3", "Dinner", function(res) {
        console.log(res);
    });
});


app.listen(port, function() {
    console.log("Started listening on port: " + port)
});