// no1
// Fixture данные 
if (Groups.find().count() === 0) {
  console.log('init colls');
  
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  
  Groups.insert({
    userId: tomId,
    name: 'test group',
    email: 't1@t1.com'
  });
}