# Typing Test with Eye Trackers 

This is essentially the same as a regular typing test, but this typing includes an eye tracking feature. If the eye trackers are enabled, it will check to make sure you aren't looking at the keyboard while typing, if so, your time will be decreased, thus reducing your WPM.

You can try the typing test yourself [here](https://gleeful-bienenstitch-7bf1ab.netlify.app/)

This typing test is different in the sense that is meant to measure a person's "true" typing ability sense you are punished for looking at the keyboard. Of course, I know there's nothing wrong with looking at the keyboard when typing (it's the only way I know how to "type"). I just wanted to experiment with something I had never done before.

For this project, I wanted to teach myself how to use ReactJS, and I also wanted to make something that I had never seen before. So, that's how I decided to make a typing test that uses eye trackers.


## Notes
- I've never been taught how to develop using ReactJS and this entire project was self taught, so there may be numerous things/best practices that I've overlooked. 
- There may be elements that don't display well on other devices. I made this on a 17in laptop, and I haven't had the chance to look at it on another device. 
- I used a trial version of the GazeCloudAPI for the eye trackers, which is limited to 1-minute eye tracking sessions.

## Some stuff I learned about

**ReactJS**

So from my understanding, ReactJS is similar to an OOP is the sense that you create classes/components, and each of these classes/components are display elements. You can create multiple "instances" of each component, and put them together to make a complete display. I see how this could make ReactJS very convenient if you find yourself reusing elements of a display often. 
Also, I know there's an html somewhere in this project, and I believe it holds some type of importance, but I it seemed like I could do pretty much everything without it since I only used JavaScript and a CSS file.

One more thing, I'm pretty sure you need to install Node.js to develop using ReactJS. But once you have that installed, open the command line and run the `npx create-react-app {project directory name}` command to create a react project in the specified directory. Then you can `cd` into the project directory and run the `npm start` command to start hosting your react app on one of your device's local ports (I believe it defaults to port 3000), then to access that react app go to localhost:3000.

---

**Netflify**

I'm using Netlify to "deploy" my React app (I put deploy in quotes because I'm not sure if that's the right term for what it's actually doing, but I'm not very concerned with the little details right now). Anyways, there seems to be 2 general methods for deploying a React app using Netlify: manually or through GitHub. 
I tried the GitHub method first because it's supposed to update the website with each push to GitHub, which seemed like the best/most convenient way to way deploy the web app, just incase I wanted to make any changes in the future. However, I was running into errors with the *react-reveal* feature that I was using. So, I decided to just avoid the hassle and go the manual route.
To deploy a manual build of your React app, just open the command line, go to the project directory and use the `npm run build` command to build a deployable version of your project. From here just go to Netlify in your browser and select "Add new site", choose "Deploy manually", and upload the project build folder. Netlify will then give you a live link to your website.

I know there's an option for using a custom domain, so that's definitely something I can look into if I ever decide to buy a domain and whatnot.

---

**React-Reveal**

React Reveal is a framework for animations in ReactJS. It's kinda self explanatory, but to install it you need to run the `npm i react-reveal` command.

---

## Resources 
There may have been other resources used, but I went through a lot of stuff, and closed a lot of tabs...
- [What is ReactJS](https://www.youtube.com/watch?v=N3AkSS5hXMA)
- [React-Reveal examples](https://www.react-reveal.com/examples/)
- [React-Reveal options/documentation](https://www.react-reveal.com/docs/props/)
- [Typing test prompt I used](https://www.shareyouressays.com/paragraphs/5-sample-paragraph-for-typing-test-for-newbie-typists/1530) (2. The Saddest Day of My Life)
- [GazeCloudAPI example](https://api.gazerecorder.com/)
- I used the following to integrate GazeCloudAPI as a react component:
  - [astonhack2019's repo](https://github.com/bahorn/astonhack2019)
  - [astonhack2019's App.js](https://github.com/bahorn/astonhack2019/blob/master/src/App.js)
  - [astonhack2019's WebGazeContext.js](https://github.com/bahorn/astonhack2019/blob/master/src/WebGazeContext.js)
  - [The App.js from repo 2](https://github.com/ruw001/GazeCloudAPIEyeTrackingDemo/blob/main/other/App.js)
  - Kind of an [overview](https://medium.com/@williamwang15/integrating-gazecloudapi-a-high-accuracy-webcam-based-eye-tracking-solution-into-your-own-web-app-2d8513bb9865) of what we want to do, but the important part is the paragraph right before the "Final Remarks" section. It says:
 ```
  For those who would like to integrate it into your React app, 
  I found a very useful Github repo for you (https://github.com/bahorn/astonhack2019). 
  Just take a look at [WebGazeContext.js] and [App.js] (these 2 files are enough!). 
  You can simply replace the original [App.js] with the [App.js] from repo 2 
  to use GazeCloudAPI as a React component.
```
- I don't remember how much I used the following I guess they're worth listing:
  - [React docs](https://reactjs.org/)
  - [React tic-tac-toe game](https://codepen.io/gaearon/pen/LyyXgK)
  - [React tic-tac-toe game tutorial](https://reactjs.org/tutorial/tutorial.html)

---
**NOTE:** The following are some default notes that the React app auto-generated. I think I went over everything that I used from it, but I thought it was worth keeping in:

---


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
