Template.home.events({
	'click .timer-start': function(event, template){
		var start = $(template.find('.timer-start'));
		var stop = $(template.find('.timer-stop'));
		var reset = $(template.find('.timer-reset'));

		start.addClass('hide');
		stop.removeClass('hide');
		reset.removeClass('hide');

		var hours = $(template.find('.timer-hours'));
		var minutes = $(template.find('.timer-minutes'));
		var seconds = $(template.find('.timer-seconds'));

		var hoursVal = parseInt($(template.find('.hours-select')).val() || 0),
			minutesVal = parseInt($(template.find('.minutes-select')).val() || 0),
			secondsVal = 0;

		function setTime(){
			if (secondsVal === 0){
				if (minutesVal === 0){
					if (hoursVal === 0){
						clearInterval(Session.get('intervalId'));
					}else {
						secondsVal = 59;
						minutesVal = 59;
						hoursVal--;
					}
				}else {
					secondsVal = 59;
					minutesVal--;
				}
			}else {
				secondsVal--;				
			}

			seconds.text(secondsVal);
			minutes.text(minutesVal);
			hours.text(hoursVal);
		}

		setTime();
		var intervalId = setInterval(setTime, 1000);

		Session.set('intervalId', intervalId);
	},

	'click .timer-stop': function(event, template){
		var start = $(template.find('.timer-start'));
		var stop = $(template.find('.timer-stop'));
		var reset = $(template.find('.timer-reset'));

		clearInterval(Session.get('intervalId'));

		start.removeClass('hide');
		stop.addClass('hide');
		reset.addClass('hide');

		var hours = $(template.find('.timer-hours'));
		var minutes = $(template.find('.timer-minutes'));
		var seconds = $(template.find('.timer-seconds'));

		seconds.text('00');
		minutes.text('00');
		hours.text('00');
	},

	'click .timer-reset': function(event, template){
		clearInterval(Session.get('intervalId'));

		var hours = $(template.find('.timer-hours'));
		var minutes = $(template.find('.timer-minutes'));
		var seconds = $(template.find('.timer-seconds'));

		var hoursVal = parseInt($(template.find('.hours-select')).val() || 0),
			minutesVal = parseInt($(template.find('.minutes-select')).val() || 0),
			secondsVal = 0;

		function setTime(){
			if (secondsVal === 0){
				if (minutesVal === 0){
					if (hoursVal === 0){
						clearInterval(Session.get('intervalId'));
					}else {
						secondsVal = 59;
						minutesVal = 59;
						hoursVal--;
					}
				}else {
					secondsVal = 59;
					minutesVal--;
				}
			}else {
				secondsVal--;				
			}

			seconds.text(secondsVal);
			minutes.text(minutesVal);
			hours.text(hoursVal);
		}

		setTime();
		var intervalId = setInterval(setTime, 1000);

		Session.set('intervalId', intervalId);
	}
});

Template.home.helpers({
	groups: function(){
		return Groups.find();
	},
	hours: function(){
		var hours = [];

		for(var i = 0; i < 24; i++){
			hours.push(i);
		}

		return hours;
	},

	minutes: function(){
		var minutes = [];

		for(var i = 1; i < 60; i++){
			minutes.push(i);
		}

		return minutes;
	}
});