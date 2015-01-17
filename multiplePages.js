var webpage = require('webpage'),
	fs = require('fs'),
	page = null;

var options = {
	hostname: 'www.ausopen.com',
	port: 80,
	path: '/en_AU/scores/draws/ms/'
};


var rounds = 7,
	urlPrefix = 'http://' + options.hostname + options.path,
	pageNames = [
		'r1s1','r1s2','r1s3','r1s4',
		'r2s1','r2s2','r3s1','r4s1',
		'r5s1','r6s1','r7s1'
	],
	pageName = pageNames.shift(),
	players = {};


function toUrl(pageName) {
	return urlPrefix.concat(pageName,'.html');
}

function nextPage(arr) {
	page.close();
	players[pageName] = arr;
	if (pageName = pageNames.shift()) {
		queryDraw(toUrl(pageName));
	} else {
		var keys = Object.keys(players);

		keys.forEach(function(value,index) {
			try {
				fs.write('./' + value, players[value], 'w');
			} catch(e) {
				console.log(e);
			}
		});
		phantom.exit();
	}
}


function queryDraw(url,round,section) {
	page = webpage.create();

	page.open(url, function(status) {
		if (status !== 'success') {
			console.log('Unable to connect to the page!');
			nextPage();
			return;
		}
		console.log('Crunching page ' + url);

		page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
			var arr = page.evaluate(function() {
				var arr = [];
				$('.sc').each(function() {
					arr.push($(this).text());
				});
				return arr;
			});
			nextPage(arr);
		});
	});
};

/////////////////////////////////////////////////////
// MAIN method
/////////////////////////////////////////////////////

(function main() {
	queryDraw(urlPrefix.concat(pageName,'.html'));
})();



