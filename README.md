# Image Processing with Sharp + Express
> This project also uses Node, TypeScript, Jasmine, ESLint


### Installation Guide

To get this project started on your local machine, first clone this repository into the directory of your choice:
```
$ git clone <GITHUB_URI>
```

Next, navigate to the directory and install the requirements (aka dependencies) using _Node Package Manager_:
```
$ npm install
```


### Running the App

To run the application locally after installing requirements (previous step), you can run the `start` script specified in the `package.json` file using:
```
$ npm run start
```

This will start the application on port 3001 by default. If you'd like to change your version to run on another port, you can change line 6 in `src/index.ts`:
```
const port = <YOUR_DESIRED_PORT_NUMBER>;
```

To view the application and utilize the core image resizing functionality, navigate to [localhost:3001](http://127.0.0.1:3001/) in the browser of your choice.


### Local Development & Testing

ESLint has been configured in the `eslint.config.mjs` file, and the script to run it has been specified in `package.json`. If you would like to use it, please run:
```
$ npm run lint
```

For local development, if you would like to reformat your code to use the config and standards specified in `.prettierrc`, please run:
```
$ npm run prettier
```

Finally, a modest test suite has been included in `src/tests` and configured in `spec/support/jasmine.json`. You can run the test and build scripts together with:
```
$ npm run test
```

The build script has been included for future deployment, though it is not currently being used for local development, other than during testing. If you run the `build` script in `package.json`, you will find the final JS files located in `dist/`


### Features

#### Primary: Image Resizing Tool

Using a simple, unstyled HTML form, users can select from the images already stored in the `src/assets/full/` folder; specify their desired width and height in pixels; and will be returned their processed image.

This tool uses the [Sharp JS module](https://www.npmjs.com/package/sharp) to take in an image, process, then resize it. It is then stored to the `src/assets/thumb` folder using the [File System (fs) module](https://nodejs.org/api/fs.html). 

If a user requests an image whose width and height have already been generated, the application will instead return the already-stored image to the user in lieu of resizing with Sharp.

Alternately, if they are not interested in using the default images, they can also upload their own image using the secondary feature (below).

#### Secondary: Custom Image Uploading

In the second form on the main app route (`/`), users are able to upload their own image. 

Once a user submits the form, the image will be stored to `src/assets/full` which is configured and processed using the [Formidable module](https://www.npmjs.com/package/formidable). 

After the image is stored, the user will be redirected to the main application route where they will see their image in the dropdown of the Image Resizing Tool and can resize it as desired.
