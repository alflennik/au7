# Aurelia Framework7: A Lightweight Mobile App Platform

![Aurelia Framework7 Hero](http://static.flennik.com/au7-hero.jpg)

## Walkthrough
Quickly build cross-platform hybrid apps for Web, iOS, Android, Windows and PWAs using the slick animations and UI components of Framework7, along with the modular, testable and extensible Aurelia Framework.

Read more about the project on the [announcement blog post](https://blog.flennik.com/a-challenger-for-ionic-aurelia-framework7-63a53e736b8a#.9qtse37zw), and [check out the demo here](http://au7.flennik.com).

### How to Kick Butt
This project uses a few open source technologies. What you can do with this project depends on your mastery of their concepts and APIs. Here is your docs reading list to get the most out of this project:

- Aurelia
- Framework7
- Cordova
- Webpack (v2)

### Routing
We are using Framework7's included router, which supports animations.

Edit the views object in app.js to add and configure new pages. It preloads your pages into the DOM using Framework7's inline pages routing mode.

## Setup

### Requirements
- NodeJS (a newer version with ES2015 support)
- Cordova ``npm install -g cordova``

### Running the App and Dev server
- Run `npm install` to download dependencies
- Run `npm run dev` to run Webpack Dev Server with live reload.
- Get coding!

### Building and Deploying
Run `npm run build` to populate the www folder with your latest minified production build.

Then use Cordova's CLI to build and deploy your app for different platforms:

- ``cordova platform add browser``
- ``cordova run browser``

And:

- ``cordova platform add android``
- ``cordova emulate android``

For build the apk:

- ``cordova build android``

Consult Cordova's docs for instructions on how to download platform dependencies like Java and Android Studio and deploying to the App and Play stores.

## Guides

### Customizing for Production

#### ***For more information on clean Webpack setups, [check out the blog post!](https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172)***

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

### Changing the Constants

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

### Adding a Linter

Aurelia Framework7 is written using Standard style, JavaScript according to sensible sylistic defaults that cannot be configured. While the inability to configure may seem like a disadvantage, this is the whole appeal of Standard -- it's standard, designed to end the never-ending debates about what clean code actually looks like.

To install standard into your project, run `npm install --save-dev standard eslint` and add some linting to your code editor. [Here are the instructions for Atom](https://atom.io/packages/linter-js-standard). You will want to check the option to only use the linter when package.json includes Standard as a dependency, or else it will complain loudly about any and all of your current existing projects.

### Optimizing the File Size

Even if you're developing for the app store, you will see advantages from some sensible optimization.

1) You get faster app install times (leading to more successful downloads and opens)
2) You get better performance: the device does not need to work as hard to parse megabytes of CSS and JS
3) Development becomes easier: your mental overhead decreases when there are less moving parts needed to keep in mind as you work

There are simple targets for optimization that will allow a dramatic slimming of the overall package size.

#### Removing Framework7's color schemes (Saves 368KB)

The file src/services/f7.js imports the dependencies necessary for Framework7. Simply comment out the line `import 'framework7/dist/css/framework7.material.colors.css'` and save 368KB. You lose access to Framework7's color schemes, so you will need to create custom CSS to achieve the same color customization. This, in my view, is a minor price to pay for such dramatic savings in file space.

#### Use a Custom Framework7 Build (Saves Up to 250KB)

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

### Adding SASS
First, install SASS. You will need both the webpack loader and the Node implementation.

```
npm install sass-loader node-sass --save-dev
```

Now we can update the Webpack config so it understands this new scss file type.

```javascript
//webpack.config.js
{
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader' }
  ]
},
```

Now we can create some SASS files. Let's create app.scss in the src folder and put in a test rule that will make the header's text blue.

```css
/* app.scss */
.navbar {
  color: hsl(240, 40%, 30%);
}
```

Import your scss file in app.js: `import './app.scss'`. It feels a little odd to import a file type that needs to be compiled to work, but thanks to Webpack, this is all we need.

Now when you run `npm run dev` the header's text should turn blue. You can stop here, but there are some easy optimizations we should throw in that will make your experience much nicer.

#### Adding sourcemaps
Sourcemaps enable you to see the file names for all your css rules which can help you understand where the rules are coming from, as well as enable you to edit your SASS files directly from the browser.

```javascript
use: [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: { sourceMap: !isProduction }
  },
  {
    loader: 'sass-loader',
    options: { sourceMap: !isProduction }
  }
]
```

Yes, you need to turn on sourcemaps twice, a bit of an odd quirk of Webpack.

#### Organizing Your SASS
Your pages, thanks to the magic of Aurelia, are neatly organized into folders with an HTML file and a JS file. Let's add a dedicated SASS file as well to complete our component-driven design. Resist the urge to put all your SASS in a single folder, separated from where it is used. Keeping your app.scss file with your app.js and app.html files is much more convenient.

However, for stuff like CSS resets, mixins and variables, a style folder will do nicely.

Previously, I suggested using `import app.scss` in your app.js file. While this is good for testing, this is not the recommended way to load your SASS. The problem is that any SASS file loaded this way would not have access to your variables or mixins, which would need to be specifically imported by *all* of your SASS files. That's a lot of repeated code. If you import a variables file in twenty SASS files, suddenly changing the name of your variables file requires changing twenty import statements! It gets worse if you want to keep your mixins separated across many files to keep them organized.

Instead, simply maintain a main.scss file. This is the file that is loaded by Aurelia, like this:

```javascript
// main.js
import './main.scss'
```

And inside main.js you import all your variables, mixins and modules, in the order that you wish.

```css
/* main.scss */
@import 'styles/reset.scss';
@import 'styles/variables.scss';
@import 'styles/mixins.scss';
@import 'app.scss';
@import 'pages/left-panel/left-panel.scss';
@import 'pages/index/index.scss';
```

This is a setup that will allow you to elegantly build up your app to an epic size with minimal growing pains.

#### Giving Your SASS Override Power
If the same CSS rule is repeated twice with the same specificity, which rule does the browser use? CSS nerds may know that the file that is loaded last is used.

For example, the navbar's background color is set in framework7.material.css like this:

```css
/* framework7.material.css */
.navbar, .toolbar, .subnavbar {
  background: #2196f3;
}
```

But what if we want to change the background color to red? We could write a more specific rule like this:

```css
body .navbar {
  background: hsl(0, 70%, 60%);
}
```

But that is not very clean, throwing bodies everywhere like a serial killer. Instead, let's move the CSS imports from the src/services/f7.js file to main.js, where we can explicitly control the order.

Now at the top of the main.js file we have all our CSS dependencies, declared in order of importance:

```javascript
//main.js
import './lib/framework7.material.css'
import './main.scss'
```

Now, if we want to change the navbar color, we can use the selector `.navbar` instead of `body .navbar`.

### Additional Guides. Coming Soon.
Enjoying these guides? Well even more are on their way!

- Customizing App Based on Platform
- Build Your App with TDD
- Create a Progressive Web App

### Acknowledgements
- Huge thanks to [Julien Enselme](http://www.jujens.eu/author/julien-enselme.html) who created the [foundation](https://www.jujens.eu/posts/en/2016/Mar/15/ionic2-aurelia-f7/) (on [GitHub](https://github.com/Jenselme/tests-ionic2-and-aurelia-framework7)) that I built this project on top of.
- Thanks to [Erik Hanchett](http://www.programwitherik.com/) for his [clean Aurelia Webpack setup](https://youtu.be/FI7a6oRwUkQ).
- Thanks to [Timo Ernst](https://www.timo-ernst.net/) for [insight into F7 routing with Frameworks](https://youtu.be/xS3G1uFXrJk).
- And of course, thanks are due to the awesome open source libraries that have made app development so powerful and elegant. Where would we be without Aurelia, Framework7, Cordova and Webpack? The world would be much less cool, and hey, a project like this may simply be impossible.
