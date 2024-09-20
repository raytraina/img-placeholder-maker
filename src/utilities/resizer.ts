// Resizing utils
import sharp from 'sharp';

export const resizeToNewFile = (inFile: string, x: number, y: number): void => {
  const outFile = sharp(inFile)
    .resize(x, y)
    .toFile('outFile.jpg', (err: Error) => {
      console.log(err);
    });
  console.log(outFile);
  // TODO: use filesystem module to save to thumb folder
};

export const checkForExisting = (inFile: string, x: number, y: number): void => {
  // TODO: use filesystem to check if file already exists in the thumb folder at requested size
  console.log(inFile, x, y);
};

export const saveNewThumb = (newFile: string): void => {
  // TODO: use fs module to store image to specified folder
  console.log(newFile);
};

// let resizeTester = () => {};

