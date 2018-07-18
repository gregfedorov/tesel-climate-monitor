var tessel = require('tessel');
var climatelib = require('climate-si7020');
var request = require('request');

var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function () {
	console.log('Connected to climate module');

	// Loop forever
	setImmediate(function loop () {
		climate.readTemperature('c', function (err, temp) {
			climate.readHumidity(function (err, humid) {
			var temperature = temp.toFixed(4);
			var humidity = humid.toFixed(4);
			request.post({
				url:'http://climate.pomp.si/api/readings',
				body: {
					"temperature": temperature,
					"humidity": humidity
				},
				json: true
			}, function (error, response, body) {
					if (!error && response.statusCode == 200) {
							console.log(body)
					}
				}
			);
			setTimeout(loop, 5000);
			});
		});
	});
});

climate.on('error', function(err) {
	console.log('error connecting module', err);
});