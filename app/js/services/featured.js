(function() {
	var myApp = angular.module('myApp');

	myApp.factory('Featured', function() {

		var Featured = function() {
			this.tracks = [];
			this.currentPage = 0;
			this.perPage = 10;
			this.busy = false;
			this.noMore = false;

			this.next = function() {
				var defer = $.Deferred();
				if (this.busy) {
					defer.reject();
				}
				var that = this;
				this.busy = true;
				this.skip = this.currentPage * this.perPage;

				$.ajax({
					url: 'http://api.jamendo.com/v3.0/tracks/?client_id=615ea00d&featured=1&include=stats&lang=en&offset=' + this.skip + '&limit=' + this.perPage,
					success: function(response) {
						if (status === 'success') {
							throw new Error(response);
						}
						if (response.results.length > 0) {
							that.tracks = that.tracks.concat(response.results);
							that.currentPage++;
						} else {
							that.noMore = true;
						}

						that.busy = false;
						defer.resolve(that.tracks);
					}
				});

				return defer.promise();
			};
		};
		return Featured;
	});
})();