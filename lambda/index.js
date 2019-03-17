/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Berkeley Bot';
const WELCOME_PROMPT = "Welcome to" + SKILL_NAME + ". What can I help you with today?";
const HELP_MESSAGE = 'You can say what events are there today, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const NOT_IMPLEMENTED = 'LMAO not yet implemented'

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'data point 1', 'more data to return lmao',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    // Standard Intents
    'LaunchRequest': function () {
        this.response.cardRenderer(WELCOME_PROMPT);
        this.emit(':responseReady');
        // this.emit('GetNewFactIntent');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.NavigateHomeIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

    // Custom Intents
    'AMAZON.FoodIntent': function () {
        this.response.speak(NOT_IMPLEMENTED);
        this.emit(':responseReady');
    },
    'AMAZON.EventsIntent': function () {
        this.response.speak(NOT_IMPLEMENTED);
        this.emit(':responseReady');
    },
    'AMAZON.TransportationIntent': function () {
        this.response.speak(NOT_IMPLEMENTED);
        this.emit(':responseReady');
    },
    'AMAZON.NewsIntent': function () {
        this.response.speak(NOT_IMPLEMENTED);
        this.emit(':responseReady');
    },

};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

