Template.settings.events({
	'click [name="newGroup"]': function(e) {
		e.preventDefault();

		var container = $(e.target).closest('tr'),
			name = container.find('[name="groupName"]'),
			email = container.find('[name="groupEmail"]'),
			time = container.find('[name="groupTime"]');

		Meteor.call('insertGroup', {name: name.val(), email: email.val(), time: time.val()});

		// Reset values
		name.val('');
		email.val('');
		time.val('');
	},
	'click [name="groupRemove"]': function(e) {
		e.preventDefault();

		var id = $(e.target).data('id');

		Groups.remove(id);
	},
	'click [name="groupEdit"]': function(e) {
		e.preventDefault();

		Session.set('isEditMode' + this._id, true);
	},
	'click [name="groupSave"]': function(e) {
		e.preventDefault();

		var container = $(e.target).closest('tr'),
			name = container.find('[name="groupName"]'),
			email = container.find('[name="groupEmail"]'),
			time = container.find('[name="groupTime"]');

		Groups.update(this._id, {$set : {name: name.val(), email: email.val(), time: time.val()}});
		Session.set('isEditMode' + this._id, false);
	}
});

Template.settings.helpers({
	groups: function() {
		return Groups.find({});
	},
	isEditMode: function(){
		return Session.get('isEditMode' + this._id);
	}
});