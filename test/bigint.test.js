describe('bigint', () => {
  let bigint;
  beforeEach(() => {
    bigint = require('../app/scripts/bigint.js');
    b = require('big-integer');
  })

  describe('getBigint()', () => {
    test('getBigint', () => {
      expect(bigint.getBigint(0, 1)).toEqual(b(1));
      expect(bigint.getBigint(0, 4294967295)).toEqual(b(4294967295));
      expect(bigint.getBigint(1, 0)).toEqual(b(4294967296));
      expect(bigint.getBigint(0x1fffff, 0xffffffff)).toEqual(b(9007199254740991));
      expect(bigint.getBigint(0x200000, 0)).toEqual(b(9007199254740992));
    })
  })
})
