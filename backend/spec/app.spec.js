const port = require('../app');

describe('testing the listen port', () => {
  it('port should be 3000', () => {
    expect(port).toBe(3000);
  })
})