Template.settings.events({
	'click [name="newGroup"]': function(e) {
		e.preventDefault();

		var container = $(e.target).closest('tr'),
			name = container.find('[name="groupName"]').val(),
			email = container.find('[name="groupEmail"]').val(),
			time = container.find('[name="groupTime"]').val();

		Meteor.call('insertGroup', {name: name, email: email, time: time});
	}
});

Template.settings.helpers({
	groups: function() {
		return Groups.find({});
	}
});