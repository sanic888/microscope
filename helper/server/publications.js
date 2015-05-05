Meteor.publish('groups', function(options){
	return Groups.find({}, options);
});