var models = {};

models.NameModel = Backbone.Model.extend({
    // URL is empty as it gets assigned in the overridden fetch method. Not canonical backbone but I am ok with it.
    url: '',
    polling: false,
    defaults: {
        name: "",
        gender: "f",
        origin: "",
        meaning: "",
        genderToFetch: "both" // default to both
    },
    // This method is to enable and disable Backbone.sync. When a user asks to stop polling requests that are out will
    // comeback and update the model. We need to be able to disable the sync so the model changes aren't show on the page
    enableSync: function (enable) {
        if (enable)
            this.sync = Backbone.sync;
        else
            this.sync = function () {
                return false;
            }
    },
    initialize: function () {
        _.bindAll(this, "startPolling", "executePolling", "onFetch");
    },
    fetch: function (options) {
        options = _.defaults((options || {}), {url: '/service/nameper-service/nameResource/random/'
            + this.attributes.genderToFetch});
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    startPolling: function (intervalSeconds) {
        this.polling = true;
        this.enableSync(true);
        if (intervalSeconds) {
            this.intervalSeconds = intervalSeconds;
        }
        this.executePolling();
    },
    stopPolling: function () {
        this.enableSync(false);
        this.polling = false;
    },
    executePolling: function () {
        this.fetchXhr = this.fetch({success: this.onFetch});
    },
    onFetch: function () {
        if (this.polling) {
            setTimeout(this.executePolling, 1000 * this.intervalSeconds);
        }
    },

    // Wrapper method for fetch, enables and disable sync.
    fetchName: function () {
        this.enableSync(true);
        this.fetch({});
        this.enableSync(false);
    }
});
