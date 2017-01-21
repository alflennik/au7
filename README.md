#Aurelia Framework7: Lightweight Mobile App Development Platform

##Walkthrough
Quickly build cross-platform apps for Web, iOS, Android, Windows and PWAs using the slick animations and UI components of Framework7, along with the modular, testable and extensible Aurelia Framework.

Read more about the project on the [announcement blog post](#).

###How to Kick Butt
This project uses a few open source technologies. What you can do with this project depends on your mastery of their concepts and APIs. Here is your docs reading list to get the most out of this project:

- Aurelia
- Framework7
- Cordova
- Webpack (v2)

###Adding Functionality to this Project. Coming Soon.
This no-cruft project includes a minimal Webpack 2 configuration and not much else. Want to trick it out with your favorite plugins and features? Check out these guides (coming soon):

- JAN 29 [Optimize the File Size](#)
- JAN 29 [Add a Linter -> Clean Code, Baby](#)
- JAN 29 [Customizing Production Webpack Configuration](#)
- FEB 5 [Add Modular SASS](#)
- FEB 12 [Customizing App Based on Platform](#)
- TBD [Build Your App with TDD](#)
- TBD [Create a Progressive Web App](#)

###Routing
We are using Framework7's included router, which supports animations.

Edit the views object in app.js to add and configure new pages. It preloads your pages into the DOM using Framework7's inline pages routing mode.

###Acknowledgements
- Huge thanks to [Julien Enselme](http://www.jujens.eu/author/julien-enselme.html) who created the [foundation](https://www.jujens.eu/posts/en/2016/Mar/15/ionic2-aurelia-f7/) (on [GitHub](https://github.com/Jenselme/tests-ionic2-and-aurelia-framework7)) that I built this project on top of.
- Thanks to [Erik Hanchett](http://www.programwitherik.com/) for his [clean Aurelia Webpack setup](https://youtu.be/FI7a6oRwUkQ).
- Thanks to [Timo Ernst](https://www.timo-ernst.net/) for [insight into F7 routing with Frameworks](https://youtu.be/xS3G1uFXrJk).
- And of course, thanks are due to the awesome open source libraries that have made app development so powerful and elegant. Where would we be without Aurelia, Framework7, Cordova and Webpack? The world would be much less cool, and hey, a project like this may simply be impossible.

##Setup

###Requirements
- NodeJS (a newer version with ES2015 support)
- Cordova ``npm install -g cordova``

###Running the App and Dev server
- Run `npm install` to download dependencies
- Run `npm run dev` to run Webpack Dev Server with live reload.
- Get coding!

###Building and Deploying
Run `npm run build` to populate the www folder with your latest minified production build.

Then use Cordova's CLI to build and deploy your app for different platforms:

- ``cordova platform add browser``
- ``cordova run browser``

And:

- ``cordova platform add android``
- ``cordova emulate android``

Consult Cordova's docs for instructions on how to download platform dependencies like Java and Android Studio and deploying to the App and Play stores.
