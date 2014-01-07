var views = {};

views.NameView = Backbone.View.extend({
    el: '#content-container',
    model: new models.NameModel(),
    template: _.template($('#interaction-template').html()),

    initialize: function () {
        this.model.bind('change:name', this.updateNameBox, this);
        this.render();

        // Prepare the tween
        this.setupTween();

        // Activate the bootstrap-select drop downs.
        this.$('.selectpicker').selectpicker();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        "click #name-btn": "getName",
        "click #options-btn": "tween",
        "change #poll-picker": "setButtonText",
        "change #gender-picker": "setGender",
        "click #name-input": "addOne",
        "click #heart-btn": "addOne"
    },
    getName: function () {
        if (this.$("#poll-picker option:selected").val() != 0) {
            if (this.model.polling) {
                this.$('#name-btn').text("Show me names!");
                this.model.stopPolling();
            } else {
                this.$('#name-btn').text("Stop showing names...");
                this.model.startPolling(this.$("#poll-picker option:selected").val());

            }
        } else {
            this.model.fetchName();
        }
    },
    updateNameBox: function () {
        var field = this.$('#name-box');
        if (this.model.toJSON().gender === 'F') {
            field.css('background-color', 'pink');
        } else {
            field.css('background-color', 'dodgerblue');
        }
        this.$('#name-input').text(this.model.toJSON().name);
    },
    setupTween: function () {
        this.tweenContainer = $("#tween-container");
        this.tweenContent = $("#text");
        this.isTweenMinimized = true;
        this.optionTween = new TimelineLite({paused: true});

        this.optionTween.to(this.tweenContainer, .25, {scale: 1, transformOrigin: '50% 0%', height: 180, zIndex: 2})
            .to(this.tweenContent, .15, {opacity: 1}, 0);
        this.tween();
    },
    tween: function () {
        if (!this.isTweenMinimized) {
            this.optionTween.play();
        } else {
            this.optionTween.reverse();
        }
        this.isTweenMinimized = this.isTweenMinimized ? false : true;
    },
    setButtonText: function () {
        // If we are polling currently, stop and change the button text
        if (this.model.polling) {
            this.model.stopPolling();
        }

        if (this.$("#poll-picker option:selected").val() != 0) {
            this.$('#name-btn').text("Send me names!");
        } else {
            this.$('#name-btn').text("Fetch me a name!");
        }
    },
    setGender: function () {
        // If the selected length is > 1, means user has selected both genders.
        if (this.$('#gender-picker :selected').length > 1) {
            this.model.set('genderToFetch', "both");
        } else {
            this.model.set('genderToFetch', this.$('#gender-picker option:selected').val());
        }
    },
    setView: function (view) {
        this.view = view;
    },
    addOne: function () {
        this.view.addOne(this.model);
    }
});

views.FavoritesView = Backbone.View.extend({
    el: '#favorites-container',
    model: new models.NameModel(),
    template: _.template($('#favorites-template').html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    addOne: function (name) {
        if (name.attributes.name) {
            var view = new views.FavoriteView({model: name});
            $('#favorite-list').append(view.render().el);
        }

    }
});

views.FavoriteView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#favorite-template').html()),
    events: {
        'click .destroy': 'clear'
    },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.checkGender();
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    checkGender: function () {
        if (this.model.attributes.gender === "F") {
            $(this.el).addClass('female');
        } else {
            $(this.el).addClass('male');
        }
    },
    clear: function () {
        $(this.el).remove();
    }
});
