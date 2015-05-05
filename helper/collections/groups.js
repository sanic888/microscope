Groups1 = new Mongo.Collection('groups');

Groups1.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function (){
    return true;
  }
});

Meteor.methods({
	insertGroup: function(group) {
		Groups1.insert(group);
	}
});
