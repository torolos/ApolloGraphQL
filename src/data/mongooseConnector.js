const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/run_stats', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const rundaySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    day: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    distance: { type: Number, required: true },
    distanceUnit: { type: String, required: true },
    speedDetails: [{
        km: { type: Number, required: true },
        speed: { type: Number, required: true }
    }],
    heartRateDetails: [{
        km: { type: Number, required: true },
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    }]
})

const RunDays = mongoose.model('RunDays', rundaySchema);

module.exports = { RunDays };
