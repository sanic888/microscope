Posts = new Mongo.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fieldsNames){
		return (_.without(fieldsNames, 'url', 'title').length > 0);
	}
});

Meteor.methods({
	postInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var postWithSameLink = Posts.findOne({url: postAttributes.url});

		if (postWithSameLink){
			return {
				postExists: true,
				_id: postWithSameLink._id
			};
		}

		var user = Meteor.user();

		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
		  userId: user._id, 
		  author: user.username, 
		  submitted: new Date().getTime(),
		  commentsCount: 0,
		  upvoters: [], 
		  votes: 0
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	},
	upvote: function(postId) {
	    var user = Meteor.user();

	    // удостоверимся, что пользователь залогинен
	    if (!user)
	      throw new Meteor.Error(401, "Надо залогиниться чтобы голосовать");

	    Posts.update({
	      _id: postId, 
	      upvoters: {$ne: user._id}
	    }, {
	      $addToSet: {upvoters: user._id},
	      $inc: {votes: 1}
	    });
	 }
});