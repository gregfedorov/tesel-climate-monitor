import express from 'express';

import readings from './readings';
import readings_by_id from './readings_by_id';

const router = express.Router();

router.use((req, res, next) => {
	console.log(req.body);
	next();
});

router.get('/', (req, res) => res.json({ message: 'hooray! welcome to our api!' }) );
router.use('/readings', readings);
router.use('/readings', readings_by_id);
	
export default router;