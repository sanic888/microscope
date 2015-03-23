var postsLimit;
PostsListController = RouteController.extend({
  template: 'postsList',
  _increment: 5,
  _limit: function() {
  	postsLimit = parseInt(this.params.postsLimit) || this._increment;
    return postsLimit;
  },
  _findOptions: function() {
    return {sort: {submitted: -1}, limit: this._limit()};
  },
  // waitOn: function() {
  //   return Meteor.subscribe('posts', this._findOptions());
  // },
  // data: function() {
  //   return {posts: Posts.find({}, this._findOptions())};
  // },
  onBeforeAction: function() {
    this.postsSub = Meteor.subscribe('posts', this._findOptions());
    this.next();
  },
  posts: function() {
    return Posts.find({}, this._findOptions());
  },
  data: function() {
    var hasMore = this.posts().fetch().length === this._limit();
    var nextPath = this.route.path({postsLimit: this._limit() + this._increment});
    return {
      posts: this.posts(),
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: "notFound",
	waitOn: function(){
		return [Meteor.subscribe('notifications')];
	}
});

Router.map(function(){
	this.route('postPage', {
		path: '/posts/:_id', 
		data: function(){
			return Posts.findOne(this.params._id);
		}, 
		waitOn: function(){
			return [
				Meteor.subscribe('singlePost', this.params._id),
				Meteor.subscribe('comments', this.params._id)
			];
		}
	});
	this.route('postSubmit', {
		path: '/submit', 
		disableProgress: true
	});
	this.route('postEdit', {
		path: '/posts/:_id/edit', 
		waitOn: function(){
			return Meteor.subscribe('singlePost', this.params._id);
		},
		data: function(){return Posts.findOne(this.params._id)}
	});
	this.route('postsList', {
		path: '/:postsLimit?',
/*		waitOn: function() {
	      postsLimit = parseInt(this.params.postsLimit) || 5;
	      return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: postsLimit});
	    },
	    data: function() {
	      //var limit = parseInt(this.params.postsLimit) || 5;
	      return {
	        posts: Posts.find()
	      };
	    },*/
	    controller: PostsListController
	});
});


var requireLogin = function(){
	if (!Meteor.user()){
		if (Meteor.loadingIn()){
			this.render(this.loadingTemplate);
		}else {
			this.render('accessDenied');
		}
	}else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function(){ 
	clearErrors();
	this.next();
}, {only: 'postSubmit'});