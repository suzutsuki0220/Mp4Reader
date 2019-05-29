describe('fileLoader()', () => {
  let fileloader;
  beforeEach(() => {
    fileloader = require('../../lib/fileLoader.js');
  });

  describe('isSupportFile()', () => {
    test('check support file is true', () => {
      expect(fileloader.isSupportFile("file.avi")).toBe(true);
      expect(fileloader.isSupportFile("file.wav")).toBe(true);
      expect(fileloader.isSupportFile("file.mov")).toBe(true);
      expect(fileloader.isSupportFile("file.mp4")).toBe(true);
      expect(fileloader.isSupportFile("file.m4v")).toBe(true);
      expect(fileloader.isSupportFile("FILE.AVI")).toBe(true);
      expect(fileloader.isSupportFile("FILE.WAV")).toBe(true);
      expect(fileloader.isSupportFile("FILE.MOV")).toBe(true);
      expect(fileloader.isSupportFile("FILE.MP4")).toBe(true);
      expect(fileloader.isSupportFile("FILE.M4V")).toBe(true);
    });
    test('check non support file is false', () => {
      expect(fileloader.isSupportFile("avi")).toBe(false);
      expect(fileloader.isSupportFile("file.avi.invalid")).toBe(false);
      expect(fileloader.isSupportFile("file.invalid")).toBe(false);
    });
  });
});
