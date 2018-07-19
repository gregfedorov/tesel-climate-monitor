import express from 'express';
import Climate from '../models/climate';

const readings = express.Router();

readings.post('/', (req, res) => {
	const reading = new Climate();
	const { temperature, humidity } = req.body

  if (!temperature || !humidity) {
    res.json({message: "Bad reading, not saving."});
    return;
  }

	reading.temperature = temperature;  
	reading.humidity = humidity;

	reading.save((err) => {
		if (err)
			res.send(err);

		res.json({ message: 'Reading created!' });
	});
})

readings.get('/', (req, res) => {
	Climate.find(function(err, readings) {
		if (err)
			res.send(err);

		res.json(readings);
	});
});

export default readings;