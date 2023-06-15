import {app} from '../server/server'

const supertest = require("supertest");
const request = supertest(app);
require("regenerator-runtime");
require("regenerator-runtime/runtime");
require("regenerator-runtime/path").path



it("gets all the data form the server", async done => {
    const response = await request.get('/getAll');
    expect(response.status).toBe(200);
    done();
  });