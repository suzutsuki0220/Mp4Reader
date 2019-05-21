describe('bigint', () => {
  let bigint;
  beforeEach(() => {
    bigint = require('../lib/bigint.js');
    //b = require('big-integer');
  })

  describe('getIntStringBE()', () => {
    test('getIntStringBE', () => {
      expect(bigint.getIntStringBE(Buffer.from([0,0,0,1,0,0,0,0]))).toEqual("1");
      expect(bigint.getIntStringBE(Buffer.from([0xFF,0xFF,0xFF,0xFF,0,0,0,0]))).toEqual("4294967295");
      expect(bigint.getIntStringBE(Buffer.from([0,0,0,0,0,0,0,1]))).toEqual("4294967296");
      expect(bigint.getIntStringBE(Buffer.from([0xff,0xff,0xff,0xff,0,0x1f,0xff,0xff]))).toEqual("9007199254740991");
      expect(bigint.getIntStringBE(Buffer.from([0,0,0,0,0,0x20,0,0]))).toEqual("9007199254740992");
    })
  })
})
