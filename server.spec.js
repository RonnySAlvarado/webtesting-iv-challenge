const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');

describe('server.js', () => {
    it('should set the test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('GET /', () => {
        it('should return 200', () => {
            return request(server).get('/').then(res => {
                expect(res.status).toBe(200);
            })
        })

        it('should return 200 using async/await', async () => {
            const res = await request(server).get('/'); //request is coming from supertest since we required it as request
            expect(res.status).toBe(200); //should return 200 status
            expect(res.type).toBe('application/json'); //should retur JSON
            expect(res.body).toEqual({ api: 'Up and running' }); //should return api: Up and running
        })
    })

    describe('GET /users', () => {
        beforeEach( async () => {
            await db('users').truncate();
        })
        it('should return users', async () => {
            const res = await request(server).get('/users');
            expect(res.body).toEqual([]);
            expect(res.status).toBe(200);
        })

        it('should return all users in db', async () => {
            const users = [
                { name: "Ronny" },
                { name: "Alahnna" }
            ];

            const userIds = users.map((user, i) => {
                return { name: user.name, id: i+1 }
            })
            await db('users').insert(users)
            const res = await request(server).get('/users');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(userIds);
        })
    })
})