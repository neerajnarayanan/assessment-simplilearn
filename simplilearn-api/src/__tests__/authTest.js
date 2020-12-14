import SuperTest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import config from '../config/config'


const supertest  = SuperTest(app);

beforeAll ((done) => {
    if(mongoose.connection.readyState === 0) {
        mongoose.connect (config.mongoose.url || config.DEV_DB, (err) => {
            if (err) {
                console.log ('Unable to connect',err)
                process.exit(1)
              } else {
                console.log('success')
              }
        });
    }
    
});

afterAll(done => {
    mongoose.disconnect();
    return done();
});

describe('POST /user/auth', () => {
    it('check login works or not when providing a valid username and password', async  done =>  {
      supertest
        .post('/auth/login')
        .send({
            "email":"a@gmail.com",
            "password":"12345678"
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            done();
        });
    }, 3000);
  });