$(function() {
    Parse.$ = jQuery;

	// Initialize Parse with your Parse application javascript keys
	Parse.initialize("APP-KEY",
					"JAVASCRIPT-ID");

	// The main view for the app
	var AppView = Parse.View.extend({
		el: $("#contact"),

		events: {
			"submit form.contact-form": "contact",
		},

		initialize: function() {
			_.bindAll(this, "contact");
			this.render();
		},
	
		contact: function(e) {
			var self = this;
	  
			var data = {
				name: this.$("#contact-name").val(),
				email: this.$("#contact-email").val(),
				phone: this.$("#contact-phone").val()
			};
      
			Parse.Cloud.run("hello", data, {
				success: function(object) {
					$('#contact').html("Thanks for your email!");
					delete self;
				},

				error: function(object, error) {
					console.log(error);
					this.$(".contact-form button").removeAttr("disabled");
				}
			});

			this.$(".contact-form button").attr("disabled", "disabled");

			return false;
		},
	
		render: function() {
			this.$el.html(_.template($("#contact-template").html()));
			this.delegateEvents();
		}
	});

	new AppView;
});