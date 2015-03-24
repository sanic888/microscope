var postsLimit;
PostsListController = RouteController.extend({
  onBeforeAction: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
    this.next();
  },
  template: 'postsList',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  // waitOn: function() {
  //   return Meteor.subscribe('posts', this.findOptions());
  // },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }});

NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});
BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
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
	this.route('home', {
	    path: '/',
	    controller: NewPostsListController
	});
	  this.route('newPosts', {
	    path: '/new/:postsLimit?',
	    controller: NewPostsListController
	});
	  this.route('bestPosts', {
	    path: '/best/:postsLimit?',
	    controller: BestPostsListController
	});
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