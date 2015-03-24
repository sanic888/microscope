Template.postEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var postId = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Posts.update(postId, {$set: postProperties}, function(error){
			if (error){
				alert(error.reason);
			}else {
				Router.go('postPage', {_id: postId});
			}
		});
	},

	'click .delete': function(e){
		e.preventDefault();

		if (confirm('Delete this post?')){
			var postId = this._id;
			Posts.remove(postId);
			Router.go('home');
		}
	}
});