import { makeResizedImage } from '../utilities/resizer';

describe('Test resizer functions', async () => {
  it('expect makeResizedImage("testFile", 300, 500) to be undefined', () => {
    // TODO - add check that file created in folder
    const returnedBool = expect(
      makeResizedImage('testFile', 300, 500),
    ).toBeUndefined;
    return returnedBool;
  });
});
