const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

const users = [
    {
        username: 'Aaron',
        email: 'aaron@gmail.com'
    },
    {
        username: 'Adam',
        email: 'adam@gmail.com'
    },
    {
        username: 'Alice',
        email: 'alice@gmail.com'
    },
    {
        username: 'Henry',
        email: 'henry@gmail.com'
    },
    {
        username: 'Brandon',
        email: 'brandon@gmail.com'
    },
]

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
    await User.collection.insertMany(users);

    console.info('info seeded');
    process.exit(0);
});