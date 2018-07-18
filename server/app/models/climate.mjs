import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ClimateSchema   = new Schema({
	temperature: Number,
	humidity: Number
});

const ClimateModel = mongoose.model('Reading', ClimateSchema);

export default ClimateModel