# dialogsystems.ai

This is the landing page for the project being worked on by award from the __[Alexa Innovation Fellowship](https://developer.amazon.com/alexa-fund/alexa-fellowship/innovation)__  to Alex Ojala, Vince Bartle, Ingrid Wu and Fang Shuo Deng at the __[SCET](https://scet.berkeley.edu/)__ in UC Berkeley. 

Contents include:
+ NLP Lecture Content for [IEOR 135/290](./LEC3.14 @ DataX.ipynb)
+ UC Berkeley Alexa Skill Node.js hook
+ Alexa Skill Development [Guide](./resources/skills_guide.md)
+ Berkeley Alexa Skill (BerkeleyBot)

To-Do:
1. Develop Web UI for Node.js hook
2. Complete handlers for transportation, event, and news intents
3. Launch Alexa Skill

### BerkeleyBot Status

Supports responses for:
1. "Read the menu from {dining_hall}"
2. "Read the menu from {dining_hall} for {meal}"
3. "Get menu from {dining_hall}"
4. "What's for {meal} at {dining_hall} today"


### To test
1. Go to or setup an AWS Lambda function
2. Create a zip folder from the index.js file, node_modules folder, handlers folder
    - If just pulled, do npm install to get the required node_modules folder
3. Upload the zip folder to AWS lambda
4. Go to Alexa Developer Console, test, and type the following commands to test
    a. open berkeley bot
    b. choose 1 of the seelected reponses from above.
        - supported dining halls are: foothill, foothill, clark kerr, crossroads
        - supports meals are: breakfast, lunch, brunch, dinner


### Known Issues

1. Asking for a meal from a dining hall sometimes returns a response: "There was a problem with the requested skill's response". This happens about 5% of the time; need to figure out what's causing this and fix.
2. Fix issues related to clark kerr (commands don't seem to work)
3. Not related to the skill, but if your computer has Avast Antivirus, you need to disable web shield if not the Alexa Developer Console test will not take input (typing anything will cause it to load forever)
