# 1. PLANNING
Using any prototyping tool of your choice (or even a simple text editor like Microsoft Word) you will create a visual prototype of your application and create a short vision document outlining:

## What your use case is for your project.
[ ] What will it do? Which components will you need to use to display information? 
[ ] How many screens will you need, and what will be displayed on each one? 
[ ] What data will you need to store?

## Which APIs your project will utilize.
o See the requirements below for reference.

## Possible risks for your implementation.
o Maybe you will need to learn functionality outside of the content taught in class in order to see your vision come to life.
o The project may be risky because it could be very large for the amount of time you have to implement, etc.

## IMPORTANT:
[ ] Your app MUST have a purpose, so do not submit a bunch of code without any reason for existing. It should be something the users might be interested in using.
[ ] It is not because you can choose to develop any app that you will get a good grade for submitting anything. Make sure to create something you would be proud to show other people, possible employers, potential clients, etc.
[ ] Your app MUST be original, meaning that no app submitted for labs will be accepted as a final project.
[ ] It will also not be accepted those apps repurposed for a different use, like a list of games, a list of groceries, a list of music, etc.
[ ] This planning must be converted into a PDF file to be submitted for evaluation.

# 2. DEVELOPMENT

## Your implementation must also follow the guidelines below [ General ]
[ ] Build your application following your plan. 
[ ] Your app must have a great UI (user interface) and provide a good UX (user experience). 
[ ] The app shell must be well-styled. You may use any CSS Framework, but it must be responsive and provide a good UI/UX.
[ ] Your app must also use some type of data management, whether Firebase Firestore or Realtime Database.
[ ] The app must use Firebase for data management (you can use either Firestore or Realtime Database).
[ ] For Firebase, it is your responsibility to make sure your database will be active until you receive the final grade for this project.
[ ] Your app must generate no critical warnings or fatal errors on the console when running on either Android or iOS.
[ ] The DevTools console must display no critical warnings or fatal errors related to your app

## Your implementation must also follow the guidelines below [ REACT ]
[ ] Your app MUST be developed using React Native: after all, you are expected to demonstrate what you have learned during the classes.
[ ] Your code must be logically divided up into components, and they must be well organized into your file structure.
[ ] You can choose any type of component you can work with. You can create Class Components or only Function Components with Hooks whenever necessary.
[ ] Your assets must be original: use your own icon and splash screen (by original, I mean do not use the standard Expo assets nor the ones provided for the classes).
[ ] Your app must be organized into multiple screens. You can choose to work with modal, stack, or tab navigation.
[ ] Be sure to style all your components and screens. It is important that your app looks professional.
[ ] It is your responsibility to ensure your database will be active until you receive the final grade for this project.
[ ] The use of Redux may not be necessary. This will not be part of the evaluation, so using Redux or not is up to you.
[ ] Typing your app with TypeScript is also optional. You can use the standard JavaScript approach, or you can use TypeScript on your app.

## Your implementation must also follow the guidelines below [ PWA ]
[ ] Google Chrome DevTools must recognize the app as a PWA, and it must be installable.
[ ] The app must contain a Web App Manifest file including all required properties to make the app a PWA.
[ ] The app must have a registered Service Worker that properly manages the events 'install', 'activate', and 'fetch'.
[ ] The app must handle one of the following cache strategies learned in class:
Cache with Network fallback, Network with Cache fallback, or Stale while Revalidate. The app must work both online and offline, therefore the strategies Cache Only and Network Only will not be accepted.
[ ] Since the app is expected to work office, you must also use IndexedDB to temporarily save the data locally when the app is offline, and then use Background Sync to save the data online once the connection is restored.
[ ] Besides the ones mentioned above, the app must also use at least 3 other Web APIs discussed in class (Notification API, Push API, Geolocation API, Sensors API, etc).

# 3. PRESENTATION
[ ] You must also record and provide a link to a video where you walk through each requirement above and the associated code.
[ ] You should give a brief demo of how the application works.
[ ] Also, like a code review, I want to know how you solved each requirement.
[ ] Show the app functionality and the snip of code used for it.
[ ] The demonstrated app must match the submitted code.
[ ] Be objective: videos should be 5 minutes long, or less.
Note: It is your responsibility to ensure that I will have access to the submitted video (I will not create an account with a service provider nor pay for subscriptions to watch your video). 

# SUBMISSION REQUIREMENTS:
Once done, go to FOL > Evaluation > Submissions and submit the following to the appropriate folder in FOL:
## Your prototype document outlining what you had planned to build.
[ ] It must be in PDF format (after exporting to PDF, ensure it is possible to read every piece of information in the document).
## Your zipped application.
[ ] Using any method to generate a zip file, compress all folders and files included in your project, EXCEPT the .expo and node_modules folders.
## A link to your video.
[ ] The link can be included in the submission comments.
[ ] The video can be hosted on Loom, Vidyard, YouTube, or a similar streaming service (as long as I don’t need to log in to watch it).