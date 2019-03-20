var getMenu = require('./handlers/food/getMenu');
const Alexa = require('ask-sdk-core');
//To test this in developer console, zip handlers (folder at root), index.js (root), and node_modules (root) and reupload to lamba function
// f

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Berkeley Bot, how can I help you today?';
    const repromptText = 'You can say: What Berkeley events are there today? or Read me the latest Twitter post.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .withSimpleCard('Welcome', speechText)
      .getResponse();
  }
};

const FoodIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FoodIntent';
  },
  async handle(handlerInput) {

    /*
      * we should make the user specify a dining hall and a meal,
      * if not the responce returned will be too darn long
    */
      var speechText = 'Sure thing! ';
      diningHall = handlerInput.requestEnvelope.request.intent.slots.dining_hall.value 
      meal = handlerInput.requestEnvelope.request.intent.slots.meal.value 
    
      const response = await getMenu.getMenuByLocationAndMeal(diningHall, meal);
      speechText = speechText.concat(response);
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Food', speechText)
        .getResponse();

    /*
    ORIGINAL
    var speechText = 'This is the Food Intent Handler!';

    //to test this in the alexa developer console, go to 'Test' then type 
    // 'tell berkeley bot read the menu from croads'

    if (handlerInput.requestEnvelope.request.intent.slots.dining_hall.value === 'croads') {
      speechText = speechText.concat(food.myMenu());
    } else {
      speechText = speechText.concat('Unrecognized dining hall');
    }
    */
  }
};

const EventsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EventsIntent';
  },
  handle(handlerInput) {
    var speechText = 'This is the Events Intent Handler!';

    speechText = speechText.concat(' Concat works!');

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Event', speechText)
      .getResponse();
  }
};

const TransportationIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TransportationIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is the Transportation Intent Handler!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Transportation', speechText)
      .getResponse();
  }
};

const NewsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'NewsIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is the News Intent Handler!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('News', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speechText = 'Please repeat.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};


let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        FoodIntentHandler,
        EventsIntentHandler,
        TransportationIntentHandler,
        NewsIntentHandler,
        FallbackIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};

/*
 * TEST: if you run this, you get the expected response
 */
// diningHall = "clark kerr"
// meal = "lunch"
// const resp =  getMenu.getMenuByLocationAndMeal(diningHall, meal);
// resp.then(function(val) {
//   console.log(val)
// })
