const Request = require('request');

describe('apiTest', () => {
  const apiTest;
  beforeAll(() => {
    apiTest = require('../app');
  })
  afterAll(() => {
    apiTest.close()
  });
  describe('POST /api/v1auth/create-user', () => {
    const data = {};
    beforeAll(done => {
      Request.post('http://localhost:3000/api/v1/auth/create-user', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 201', () => {
      expect(data.status).toBe(201);
    })
  })

  describe('POST /api/v1/auth/signin', () => {
    const data = {};
    beforeAll(done => {
      Request.post('http://localhost:3000/api/v1/auth/signin', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 200', () => {
      expect(data.status).toBe(200);
    })
  })

  describe('POST /api/v1/articles', () => {
    const data = {};
    beforeAll(done => {
      Request.post('http://localhost:3000/api/v1/articles', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 201', () => {
      expect(data.status).toBe(201);
    })
  })

  describe('GET /api/v1/articles', () => {
    const data = {};
    beforeAll(done => {
      Request.get('http://localhost:3000/api/v1/articles', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 200', () => {
      expect(data.status).toBe(200);
    })
  })

  describe('POST /api/v1/gifs', () => {
    const data = {};
    beforeAll(done => {
      Request.post('http://localhost:3000/api/v1/gifs', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 201', () => {
      expect(data.status).toBe(201);
    })
  })

  describe('GET /api/v1/gifs', () => {
    const data = {};
    beforeAll(done => {
      Request.get('http://localhost:3000/api/v1/gifs', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 200', () => {
      expect(data.status).toBe(200);
    })
  })

  describe('GET /api/v1/feed', () => {
    const data = {};
    beforeAll(done => {
      Request.get('http://localhost:3000/api/v1/feed', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    })
    it('status 200', () => {
      expect(data.status).toBe(200);
    })
  })

});


