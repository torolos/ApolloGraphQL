const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://mongo-torolos-001:01XPKCQaJ8bYDFiDP38XAJqHIlfUsIlI3QE0OhNlsW9PTB91ae7mYisE9FxAkPjDXYpyQNrThCJRNQxmq2xKnw%3D%3D@mongo-torolos-001.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongo-torolos-001@', {
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
