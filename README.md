# chat-application


## What is it? 
Single page application that contains following pages/views.
1. Chat page
2. Settings page

## How does it work?

Application has two views:
- `chat` is main view which has chat messages and control that allows sending messages.
- `settings` view with user settings.

`chat` - User can view messages in scrolled window when new message arrives scroll is set to bottom.
Message can be sent by using '>' button or CTRL+Enter when this setting is on.

`settings` - has following user settings:

- `username` user name displayed for other users
- `interfaceColor` - dark or white app theme
- `language` - app language
- `dateFormat` - 12h or 24 hour format
- `sendOnCTRLandEnter` - send messages on CTRL+ENTER otherwise user need click '>' button to send message. 

## Setup and run

### Clone repo
`git clone https://github.com/vonpo/chat-application.git`

### Install
Open app directory.
`npm install`

### Run tests
`npm run test`

### Run dev app
`npm start`

### Run build app
`npm run build`

### Setup backend endpoint
// todo

## What has been done?
- [x] You have to use React as your framework;
- [x] You have to use CSS preprocessors;
- [x] You have to write the app in TypeScript;
- [x] It should work on every desktop and phone, so you have to make responsive
design. And it has to work both portrait and landscape orientation;
- [x] It should work on desktop/tablet/phone at least on the following browsers:
Chrome, Firefox and Safari. Consider the latest versions for each browser;
- [x] Please, do not use any tool like or similar to create-react-app;
- [x] Write at least some tests that would cover the main functionality of your app.
We do not expect to be 100% test covered;
- [x] Write clean, commented, small and modularized code;
- [x] Working code, that works if we serve it with the http server and open in a
browser;
- [x] README file that contains:
- [x] a. What is it;
- [x] b. How does it work;
- [x] c. How could we setup and run it;
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
