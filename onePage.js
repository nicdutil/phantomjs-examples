

var page = require('webpage').create();


var options = {
	hostname: 'www.ausopen.com',
	port: 80,
	path: '/en_AU/scores/draws/ms/r1s1.html'
};

page.open('http://' + options.hostname + options.path, function(status) {

	if (status !== 'success') {
		console.log('Unable to connect to the page!');
		return;
	} 
/*	page.onConsoleMessage = function(msg) {
		console.log(msg);
	}
*/
	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {

		var players = page.evaluate(function() {
			var players = [];
			$('.sc').each(function() {
				players.push($(this).text());
			});

			return players;
		});

		console.log(players);
		phantom.exit();
	});

});