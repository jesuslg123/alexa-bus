# Alexa Bus

Alexa Bus is an Alexa Skill project which allow to load bus stop times for differents cities. This project use dependencies injection to load the city library, allowing it to be ported to many cities with less effort.

## Getting Started

Clone this project and setup ASK CLI in order to deploy the skill into your lambda and skill configuration, you can skip ASK CLI and do it manually.

### Prerequisites

In order to use this project you will need

* [Node v8+](https://nodejs.org/en/download/)
* [Alexa developer account](https://developer.amazon.com/alexa)
* [Amazon developer account](https://aws.amazon.com)

## Deployment

This project contains two main parts, the **model** and the **lambda**

* **Model**: It's contains all the alexa configuration. In this part you will define your skill invocation name, intents and utterances sample which will be use to training the system. [More info](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html)
* **Lambda**: It's basically your skill backend. Here you will manage evert intent request and perform data request and format before return the answer to Alexa. [More info](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)

There are many documentation to help you out deploy an skill in case you have never done, here are some links.

* [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* [Alexa Skill Kit](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)

##### Environment variables

In order to decide which city is enable on the deploy I'm using an environment variable called **CITY**, I also use variables for API keys access and servers urls.

Right now only support two cities:

* **CITY** = GRANA || BARNA

For **BARNA** mode:

* **BARNAAPI** = TMB Api url
* **TMBAPPID** = TMB Api appID
* **TMBKEY** = TMB Api key

For **GRANA** mode:

* **GRANADAAPI** = GranadaBus Api url (This is a private API)


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Live skills

[![GranadaBus](https://images-na.ssl-images-amazon.com/images/I/51MGSyCp1QL._SL210_QL95_BG0,0,0,0_FMpng_.png)](https://www.amazon.es/Apps-Entertainment-Granada-Bus/dp/B07KX3GKKK) [![BarnaBus](https://images-na.ssl-images-amazon.com/images/I/51RSYDU3wjL._SL210_QL95_BG0,0,0,0_FMpng_.png)](https://www.amazon.es/Apps-Entertainment-BarnaBus-TMB/dp/B07LCGKNBC)

## Authors

* **Jesus Lopez** - [jesuslg123](https://github.com/jesuslg123)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

# **TODO**

* Improve dependency injection
* Add Tests
* Languages support using i18n
* Improve skill model
