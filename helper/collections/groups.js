Groups = new Mongo.Collection('groups');

Groups.allow({
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
		Groups.insert(group);
	}
});
