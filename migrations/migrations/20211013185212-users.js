/*eslint-disable */
module.exports = {
  async up(db) {
    await db.collection('users').insertMany([{
      name: 'Adam',
      email: 'test@gmail.com',
      audio: '',
    }, {
      name: 'John',
      email: 'john@gmail.com',
      audio: '',
    }, {
      name: 'Noah',
      email: 'noah@gmail.com',
      audio: '',
    }, {
      name: 'Benjamin',
      email: 'benjamin@gmail.com',
      audio: '',
    }, {
      name: 'James',
      email: 'james@gmail.com',
      audio: '',
    }, {
      name: 'Lucas',
      email: 'lucas@gmail.com',
      audio: '',
    }]);
  },
};
