Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: "notFound",
	waitOn: function(){
		return [Meteor.subscribe('groups')];
	}
});

Router.map(function(){
	this.route('home', {
		path: '/home',
		waitOn: function() {
			return Meteor.subscribe('groups');
		},
		data: function(){
			return Groups.find({});
		}
	});
});