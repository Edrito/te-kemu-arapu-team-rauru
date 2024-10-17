https://te-kemu-arapu.web.app/

https://courses-git.cms.waikato.ac.nz/ew193/te-kemu-arapu-compx374-team-rauru/

To deploy the web app to firebase hosting:

- run "npm run predeploy"
- run "npm run pre-build"
- copy the content of "./global.css.web.css" to the CSS file located in "./dist/_expo/static/css/web-****.css"
   - *do not change file names*
- run "firebase deploy --only hosting"

The folder "./json" contains formatting standards for the jsons that are used in the game_state and player_action requests/documents.


# Below are the default instructions on how to deploy the REACT app using expo.


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.