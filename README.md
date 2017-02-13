#Aurelia Framework7: A Lightweight Mobile App Platform

![Aurelia Framework7 Hero](http://static.flennik.com/au7-hero.jpg)

##Walkthrough
Quickly build cross-platform hybrid apps for Web, iOS, Android, Windows and PWAs using the slick animations and UI components of Framework7, along with the modular, testable and extensible Aurelia Framework.

Read more about the project on the [announcement blog post](https://blog.flennik.com/a-challenger-for-ionic-aurelia-framework7-63a53e736b8a#.9qtse37zw), and [check out the demo here](http://au7.flennik.com).

###How to Kick Butt
This project uses a few open source technologies. What you can do with this project depends on your mastery of their concepts and APIs. Here is your docs reading list to get the most out of this project:

- Aurelia
- Framework7
- Cordova
- Webpack (v2)

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

##Guides

###Customizing for Production

####***For more information on clean Webpack setups, [check out the blog post!](https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172)***

You can easily customize your Webpack setup. In webpack.config.js, you'll notice:

```javascript
const isProduction = env.production === true
const platform = env.platform
```

These variables allow you to dynamically alter your Webpack configuration, and they are fairly self-explanatory. Check out this example using isProduction:

```javascript
devtool: (() => {
  if (isProduction) return 'hidden-source-map'
  else return 'cheap-module-eval-source-map'
})()
```

These variables allow you to easily control your config. Although `platform` is simply `default` by default, as you add new platforms to your projects it's not hard to imagine how easily you can change Webpack's behavior.

But what about the app itself? Can you change Aurelia's configuration based on these constants? Why, yes. It comes down to the `PRODUCTION` and `PLATFORM` constants that are set by `webpack.DefinePlugin`.

Here is an example of changing Aurelia's configuration while in production:

```javascript
//main.js
if (PRODUCTION) {
  // Turn off logging in production mode.
  aurelia.use
    .basicConfiguration()
} else {
  aurelia.use
    .basicConfiguration()
    .developmentLogging()
}
```

###Changing the Constants

You can change the constants to suit your app's unique requirements. In package.json, there are CLI commands that can easily be accessed by `npm run dev` and `npm run build`.

```javascript
// package.json
"scripts": {
  "dev": "webpack-dev-server -d --env.platform=default --progress",
  "build": "webpack -p --env.production --env.platform=default --progress"
},
```

What if you wanted to add an `npm run dev:idea` that passed an additional IDEA constant to Aurelia while in dev mode?

First, you would add the new script and add the new constant to it.

```javascript
"dev:idea": "webpack-dev-server -d --env.platform=default --env.idea --progress"
```

Then you would send the constant through to Aurelia.

```javascript
// webpack.config.js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(isProduction),
  PLATFORM: JSON.stringify(platform)
  IDEA: JSON.stringify(env.idea === true) // set IDEA to false if undefined
})
```

Now `IDEA` is a globally available boolean throughout your Aurelia app that you can use to change how things work. You can run `npm run dev` for standard behavior, and `npm run dev:idea` for your new idea.

A warning: changing these constants is designed allow outputting wholly-different versions of your app. This should not be used to store normal application data.

###Adding a Linter

Aurelia Framework7 is written using Standard style, JavaScript according to sensible sylistic defaults that cannot be configured. While the inability to configure may seem like a disadvantage, this is the whole appeal of Standard -- it's standard, designed to end the never-ending debates about what clean code actually looks like.

To install standard into your project, run `npm install --save-dev standard eslint` and add some linting to your code editor. [Here are the instructions for Atom](https://atom.io/packages/linter-js-standard). You will want to check the option to only use the linter when package.json includes Standard as a dependency, or else it will complain loudly about any and all of your current existing projects.

###Optimizing the File Size

Even if you're developing for the app store, you will see advantages from some sensible optimization.

1) You get faster app install times (leading to more successful downloads and opens)
2) You get better performance: the device does not need to work as hard to parse megabytes of CSS and JS
3) Development becomes easier: your mental overhead decreases when there are less moving parts needed to keep in mind as you work

There are simple targets for optimization that will allow a dramatic slimming of the overall package size.

####Removing Framework7's color schemes (Saves 368KB)

The file src/services/f7.js imports the dependencies necessary for Framework7. Simply comment out the line `import 'framework7/dist/css/framework7.material.colors.css'` and save 368KB. You lose access to Framework7's color schemes, so you will need to create custom CSS to achieve the same color customization. This, in my view, is a minor price to pay for such dramatic savings in file space.

####Use a Custom Framework7 Build (Saves Up to 250KB)

An excellent feature of Framework7 is the support for custom builds. Let's say you want to use Framework7's page animations and routing, but you have no use for its accordions, icon library, sliders, datepickers, etc. In this case you could remove 250KB by removing all optional components... giving you more control and responsibility over the UI components you want to use. You also have the power to specify a list of components you are using.

- [Download Framework7 from Github](https://github.com/nolimits4web/framework7/) and install it into its own folder. The readme provides instructions for running the project with gulp.
- Follow the instructions for [custom builds](https://framework7.io/docs/custom-build.html), which will generate a new much smaller set of css and js files. You can specify the components and features that are included. Make sure to include fast-clicks, which fixes the touch delay on mobile browsers.
- Put the custom files into your project. Although the custom builder creates minified versions as well, use the full-size commented versions which are much nicer for development. The files will be minified for production later by Webpack. Create a new folder called lib in the src folder of your au7 project and paste in framework7.material.custom.css and framework7.custom.js.
- Update your dependencies. In src/services/f7.js, change the links to point to the custom files:

````
import '../lib/framework7.material.custom.css'
import '../lib/framework7.custom.js'
````

- Open framework7.material.custom.css and comment out the line: `background-image: url("../img/i-f7-material.png");`. This is a broken link, and broken links will prevent Webpack from compiling.
- Run `npm remove framework7 --save`, since the node_modules version of framework7 is no longer being used. Keeping it would be confusing, so do not skip this step!
- You can no longer update Framework7 via npm, instead update the project you downloaded from Github (you can do so via Git) and then re-export the custom build and replace the files you copied.

###Additional Guides. Coming Soon.
This no-cruft project includes a minimal Webpack 2 configuration and not much else. Want to trick it out with your favorite plugins and features? Check out these guides (coming soon):

- Add Modular SASS
- Customizing App Based on Platform
- Build Your App with TDD
- Create a Progressive Web App
