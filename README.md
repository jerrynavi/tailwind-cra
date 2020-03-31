# How to Use Tailwind CSS in a Create-React-App Project

Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is designed as a low-level framework that gives you all the building blocks you need to make your own designs without fumbling with `!important`, and usually, without ever leaving your template.

I first heard about Tailwind from one of its creators, [@reinink](https://twitter.com/reinink), and I've been following its progress since one of the earliest pre-release versions. I used it in a few Angular projects at the time, and I've loved it ever since.

Recently, I learned to configure a React app bootstrapped with `create-react-app` (==CRA==) without having to run the dreaded `eject` script. I will show you how to do the same in this post.

## Getting Started

First, bootstrap a React app using the CRA CLI by running the following command:

### Using npx

```bash
npx create-react-app ==tailwind-cra== --template typescript
```

### Using yarn

```bash
yarn create react-app ==tailwind-cra== --template typescript
```

The command will create a single-page React application with a modern build setup for you. If the command is completed, you can `cd` into the directory and run `npm start` or `yarn start` to see your app running at `http://localhost:3000`. You can skip this step if you are looking to integrate Tailwind into an existing CRA project.

*Note: I will be using Yarn to add packages and run/build my app. You can always replace `yarn` with `npm` and the corresponding command name without any issues.*

## Installing Tailwind

Next, you need to install Tailwind CSS. Per the [Tailwind CSS documentation](https://tailwindcss.com/docs/installation), you only need to run one command. Make sure you are in the root directory of your newly created React app, then run the following command:

```bash
yarn add tailwindcss
```

If it runs successfully, it should output the following and make Tailwind available in our project:

![Successful installation of Tailwind](https://i.imgur.com/AkjEfAf.png)

Next you need to add Tailwind to your CSS using the `@tailwind` directive. `cd` into your project's `src` directory and add the following to your project's topmost CSS file. In my case, it is the `index.css` file:

```css
/* src/index.css */

@tailwind base;

@tailwind components;

@tailwind utilities;

/* Rest of CSS file */
```

Before going ahead to process your CSS with Tailwind, you can generate a Tailwind config file and [modify it](https://tailwindcss.com/docs/configuration) (override the defaults, extend or add your own keys) by running the following command:

```bash
npx tailwindcss init
```

This is entirely optional, but it's very useful if you want to create your own theme based on your brand colours or remove utilities or components that you don't need. Which is exactly why you're here and not reading the docs of some popular CSS framework. *\*cough\** *Bootstrap* *\*cough\**

## Overriding the Create-React-App config

The final step would be to add Tailwind as a `PostCSS` plugin in your build chain. For a CRA app, however, you do not have access to the underlying `webpack` configuration unless you run the dreaded `yarn run eject` command, from which there is no going back. Ever.

We can work around this by using the [customize-cra](https://www.npmjs.com/package/customize-cra) package. `customize-cra` lets one customize CRA applications from v2 by leveraging the functionalities provided by [react-app-rewired](https://github.com/timarney/react-app-rewired/).

In other words, by installing `customize-cra` and `react-app-rewired`, you can make modifications to the underlying `webpack` config without running `yarn run eject`. That way, if you ever want to go back, you simply have to undo the changes you made in this step and act like nothing happened. *What CRA doesn't know, right?*

Make sure you are in your project's root directory, then run the following commands:

```bash
touch config-overrides.js
```

```bash
yarn add customize-cra react-app-rewired --dev
```

The first command will create a file named `config-overrides.js` in your project's root directory while the second command will add the `customize-cra` and `react-app-rewired` packages as [devDependencies](https://nodejs.dev/npm-dependencies-and-devdependencies) for your project.

Next, open your `package.json` file and make the following modifications to the scripts section:

```diff
- "start": "react-scripts start",
+ "start": "react-app-rewired start",
- "build": "react-scripts build",
+ "build": "react-app-rewired build",
- "test": "react-scripts test",
+ "test": "react-app-rewired test",
"eject": "react-scripts eject"
```

We are replacing the existing calls to `react-scripts` for `start`, `build` and `test`. Please leave the `eject` script as-is. There are no configuration options to change for the `eject` script.

*While you can always go back, from this point on please do note that, "[stuff can break](https://twitter.com/dan_abramov/status/1045809734069170176)".*

Finally, open the `config-overrides.js` file you created earlier and add the following contents to it:

```js
const {
    override,
    addPostcssPlugins
} = require('customize-cra');

module.exports = override(
    addPostcssPlugins([
        require('tailwindcss'),
        require('autoprefixer'),
    ]),
);
```

What you've done is import the `override()` function from the `customize-cra` package and called it with the `addPostCssPlugins()` plugin. This plugin accepts an array with the PostCSS plugins you need for Tailwind CSS, namely the `tailwindcss` and `autoprefixer` plugins. Tailwind should now be available for you to use in your project.

## Using Tailwind

To see how amazing Tailwind is, let's have you create a nice-looking card without writing a single line of CSS. *How cool is that,* ***really?*** You'll see.

First, `cd` into your ==src== directory and delete the `App.css` file that comes with a fresh CRA application.

```bash
cd src
```

```bash
rm App.css
```

Then, replace the contents of your `App.tsx` file with this:

```tsx
import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mx-auto max-w-3xl p-4 shadow-lg rounded">
        <div className="text-center">

          <img src={logo} alt="Logo" className="h-32 my-4 mx-auto" />

          <div className="text-gray-500 text-2xl font-bold">
            <h1>
              Welcome to Tailwind!
            </h1>
          </div>

          <div className="my-4">
            <p>
              Learn more by <a href="https://tailwindcss.com/docs/utility-first" className="text-blue-400">visiting the docs.</a>
            </p>
            <p>
              Cheers!  
              <span role="img" aria-labelledby="cheers emoji">
                🎊
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

```

![New homepage](https://i.imgur.com/zV6gYXd.png)

Your logo isn't spinning, but you can make it do so by extending the `tailwind.config.js` file and adding a plugin, like [tailwindcss-animations](https://github.com/benface/tailwindcss-animations).

Make sure to check out the section on the Tailwind Docs about [reducing the file size for the CSS](https://tailwindcss.com/docs/controlling-file-size) Tailwind generates for you.

Cheers and have fun working with Tailwind!
