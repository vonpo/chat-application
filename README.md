# chat-application


## What is it? 
Create a single page application based on following mockups: 
Application should contain 2 pages:
1. Chat page
2. Settings page

## How does it work?

## Setup and run

### Install
`npm install`

### Run tests
`npm run tests`

### Run dev app
`npm start`


### Setup backend endpoint
// todo

## What has been done?
- [x] You have to use React as your framework;
- [x] You have to use CSS preprocessors;
- [x] You have to write the app in TypeScript;
- [ ] It should work on every desktop and phone, so you have to make responsive
design. And it has to work both portrait and landscape orientation;
- [ ] It should work on desktop/tablet/phone at least on the following browsers:
Chrome, Firefox and Safari. Consider the latest versions for each browser;
- [x] Please, do not use any tool like or similar to create-react-app;
- [x] Write at least some tests that would cover the main functionality of your app.
We do not expect to be 100% test covered;
- [x] Write clean, commented, small and modularized code;
- [x] Working code, that works if we serve it with the http server and open in a
browser;
- [x] README file that contains:
- [x] a. What is it;
- [ ] b. How does it work;
- [ ] c. How could we setup and run it;
- [x] d. Create a checkbox list of all the features required by this homework
and check the ones you were able to accomplish;

## App layout
App layout set in `main.tsx` file.

It has grid column layout with height of `100vh` of user screen.

`Footer` and `Header` have static height `PageView` has flex set to 1 which will make content fill all space between header and footer.
When `PageView` is larger than space between `Header` and `Footer` scroll-y is applied.


## Internationalization

For i18n `https://react.i18next.com/` is used.
Translations can be found in `src/18n/index.ts`
