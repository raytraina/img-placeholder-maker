import { makeResizedImage } from "../utilities/resizer";

// handle basic file test
it('expect makeResizedImage("testFile", 300, 500) to be undefined', () => {
    // TODO - add check that file created in folder
    expect(makeResizedImage("testFile", 300, 500)).toBeUndefined;
});