// Resizing utils
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';

export const resizeToNewFile = (inFile: any, x: number, y: number, filename: string) => {
//   const outFile = sharp(inFile)
//     .resize(x, y)
//     .toFile(`test_${x}x${y}.jpg`, (err: Error) => {
//       console.log(err);
//     });
    x = Number(x);
    y = Number(y);
    // (x as unknown) as number;
    // (y as unknown) as number;

    let outfileConfirmation = sharp(inFile)
                                .rotate()
                                .resize(x, y)
                                .jpeg({ mozjpeg: true })
                                .toBuffer()
                                .then( async(data) => { 
                                    const myFile = await fsPromises.writeFile(`./src/assets/thumb/${filename}_${x}x${y}.jpg`, data);
                                })
                                .catch( err => { console.log(err) });

//   console.log(outFile);
  return outfileConfirmation;
  // TODO: use filesystem module to save to thumb folder
};

export const checkForExisting = async (inFilename: string, x: number, y: number) => {
  // TODO: use filesystem to check if file already exists in the thumb folder at requested size
    const myFile = await fsPromises.readFile(`./src/assets/full/${inFilename}.jpg`);
    // myFile.readFile( );
    // console.log(myFile);
    let resized = resizeToNewFile(myFile, x, y, inFilename);
    return resized;

    // WORKING!
    // const myFile = await fsPromises.open(`./src/assets/thumb/${inFile}_${x}x${y}.jpg`, 'a+');

};

export const saveNewThumb = (newFile: string): void => {
  // TODO: use fs module to store image to specified folder
  console.log(newFile);
};

// let resizeTester = () => {};

