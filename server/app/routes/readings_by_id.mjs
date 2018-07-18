import express from 'express';
import Climate from '../models/climate';

const readings_by_id = express.Router();

readings_by_id.get('/:reading_id', (req, res) => {
	Climate.findById(req.params.reading_id, function(err, reading) {
		if (err)
			res.send(err);
		res.json(reading);
	});
})

readings_by_id.put('/:reading_id', (req, res) => {
	Climate.findById(req.params.reading_id, (err, reading) => {

		if (err)
      res.send(err);
      
    const { temperature, humidity } = req.body;

    if (!temperature && !humidity) {
      res.json({message: "Bad reading, not saving."});
      return;
    }

    reading.temperature = req.body.temperature;
    reading.humidity = req.body.humidity;

		reading.save((err) => {
			if (err)
				res.send(err);

			res.json({ message: 'Reading updated!' });
		});

	});
})

readings_by_id.delete('/:reading_id', (req, res) => {
	Climate.remove({
		_id: req.params.reading_id
	}, (err, reading) => {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});

export default readings_by_id;