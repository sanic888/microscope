Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: "notFound"
});

Router.map(function(){
	this.route('', {
		path: '/',
		waitOn: function() {
			return Meteor.subscribe('groups');
		},
		data: function(){
			return Groups.find({});
		}
	});
});