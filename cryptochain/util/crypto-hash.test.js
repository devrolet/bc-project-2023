const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {

  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('bar'))
      .toEqual('fcde2b2edba56bf408601fb721fe9b5c338d10ee429ea04fae5511b68fbf8fb9');
  });

  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three'))
      .toEqual(cryptoHash('three', 'one', 'two'));
  });

});