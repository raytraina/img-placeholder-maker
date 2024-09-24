// Resizing utils
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

// async function to kick off image processing
export const makeResizedImage = async (
  inFilename: string,
  x: number,
  y: number,
) => {
  // Grab original full size file
  let _File;
  try {
    // handle primary file format jpg
    _File = await fsPromises.readFile(`./src/assets/full/${inFilename}.jpg`);
  } catch (err) {
    console.log(err);
    // handle jpegs
    try {
      _File = await fsPromises.readFile(`./src/assets/full/${inFilename}.jpeg`);
    } catch (innererr) {
      console.log(innererr);
      // handle pngs
      _File = await fsPromises.readFile(`./src/assets/full/${inFilename}.png`);
    }
  }

  // Call helper to create resized image with sharp and store
  const resized = await resizeToNewFile(_File, x, y, inFilename);
  return resized;
};

export const resizeToNewFile = (
  inFile: object,
  x: number,
  y: number,
  filename: string,
) => {
  x = Number(x);
  y = Number(y);
  // (x as unknown) as number;
  // (y as unknown) as number;

  const outfileConfirmation = sharp(inFile)
    .rotate()
    .resize(x, y)
    .jpeg({ mozjpeg: true })
    .toBuffer()
    .then(async (data) => {
      // use filesystem module to save to thumb folder
      const myFile = await fsPromises.writeFile(
        `./src/assets/thumb/${filename}_${x}x${y}.jpg`,
        data,
      );
      return myFile;
    })
    .catch((err) => {
      console.log(err);
    });
  return outfileConfirmation;
};
