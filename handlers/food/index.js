// EXPRESS STUFF
const express = require('express')
const port = process.env.PORT || 8000

// WEB SCRAPER STUFF
var request = require('request');
var cheerio = require('cheerio');

const id = '#node-177'
const content = '.content'
const menu = '.menu_wrap_overall'

const baseUrl = 'https://caldining.berkeley.edu/';
const today = "menu"
const today_plus_one = "menu_day2"
const today_plus_two = "menu_day3"
const today_plus_three = "menu_day4"

const app = express()

app.get('/', function (req, res) {
    return res.status(200).json({
        "Get today's menu": "/plusZero",
        "Get tomorrow's menu": "/plusOne",
        "Get 2 days' later's menu": "/plusTwo",
        "Get 3 days' later's menu": "/plusThree",
    })
});

app.get('/plusZero', function (req, res) {
    scrapeMenu(today, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

app.get('/plusOne', function (req, res) {
    scrapeMenu(today_plus_one, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

app.get('/plusTwo', function (req, res) {
    scrapeMenu(today_plus_two, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

app.get('/plusThree', function (req, res) {
    scrapeMenu(today_plus_three, function(mealsInfo) {
        return res.status(200).json(mealsInfo);
    });
});

function scrapeMenu(day, callback) {
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
            // console.log(mealsInfo['Cafe_3']['Dinner']['SOUPS'])
            // return res.status(200).json(mealsInfo);
            // return mealsInfo
            callback(mealsInfo)
        } else {
            // TODO: do something if there is an error
        }
    });
}

function isSection(word) {
    return word.match(/([A-Z]+ )*[A-Z]{2,}/g) != null
}

app.listen(port, function() {
    console.log("Started listening on port: " + port)
});

// contain the method