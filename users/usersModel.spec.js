const db = require('../data/dbConfig.js');

const Users = require('./usersModel.js');

describe('the users model', () => {

    describe('insert()', () => {

        // basically cleans up the database after each test so it doesn't constantly add to the database
        beforeEach( async () => {
            await db('users').truncate();
        })

        it('should insert users into the db', async () => {
            //using our model method
            await Users.insert({ name: 'Ronny' });
            await Users.insert({ name: 'Alahnna' });

            // confirm with knex
            const users = await db('users');

            expect(users).toHaveLength(2);
            expect(users[0].name).toBe('Ronny');
        })

        it('should return the new user on insert', async () => {
            const user = await Users.insert({ name: 'Ronny' })

            expect(user).toEqual({ id: 1, name: 'Ronny' })
        })
    })

    describe('findById()', () => {
       beforeEach( async () => {
            await db('users').truncate();
        })
        it('finds a user by id', async () => {
            await db('users').insert([
                {name: "Ronny"}, 
                {name: "Alahnna"}
            ])

            const user = await Users.findById(1);
            expect(user.name).toBe('Ronny');
        })
    })




    describe('remove()', () => {

        // basically cleans up the database after each test so it doesn't constantly add to the database
        beforeEach( async () => {
            await db('users').truncate();
        })

        it('should remove a user from the db', async () => {
            //using our model method
            await Users.insert({ name: 'Ronny' });
            await Users.insert({ name: 'Alahnna' });
            await Users.remove(1);
            await Users.remove(2);

            // confirm with knex
            const users = await db('users');

            expect(users).toHaveLength(0);
            expect(users).toEqual([]);
        })
    })
})