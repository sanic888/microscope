Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error, result){
			if (error){
				throwError(error.reason);

				if (error.error === 302){
					Router.go('postPage', {_id: error.details});
				}
			}if (result.postExists){
				throwError('URL already exists!!!');

				Router.go('postPage', {_id: result._id});
			}else{
				Router.go('postPage', {_id: result._id});
			}
		});
	}
});