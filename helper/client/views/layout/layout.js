Template.layout.events({
	'click .tabs > li': function(event, template){
		var target = event.currentTarget;

		$(template.find('.tab-content.active')).removeClass('active');
		$(template.find('.tabs > .active')).removeClass('active');

		var action = $(target).attr('data-action');

		$(target).addClass('active');
		$(template.find('[data-name="' + action + '"]')).addClass('active');
	}
});