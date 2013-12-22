var models = {};

models.NameModel = Backbone.Model.extend({
    // URL is empty as it gets assigned in the overriden fetch method. Not canonical backbone but I am ok with it.
    url: '',
    polling: false,
    defaults: {
        name: "",
        gender: "f",
        origin: "",
        meaning: "",
        genderToFetch: "boy"
    },
    initialize: function () {
        _.bindAll(this, "startPolling", "executePolling", "onFetch");
        this.bind('change:genderToFetch', this.updateUrl);
    },
    // '/nameper/nameper-service/nameResource/random/' local
    fetch: function (options) {
        options = _.defaults((options || {}), {url: '/service/nameper-service/nameResource/random/'
            + this.attributes.genderToFetch});
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    startPolling: function (intervalSeconds) {
        this.polling = true;
        if (intervalSeconds) {
            this.intervalSeconds = intervalSeconds;
        }
        this.executePolling();
    },
    stopPolling: function () {
        this.polling = false;
    },
    executePolling: function () {
        this.fetch({success: this.onFetch});
    },
    onFetch: function () {
        if (this.polling) {
            setTimeout(this.executePolling, 1000 * this.intervalSeconds);
        }
    }
});
