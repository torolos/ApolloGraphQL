const casual = require('casual');
const { RunDays } = require('./mongooseConnector');
const _ = require('lodash');

const resolvers = {
    Query: {
        getStats: () => {
            return new Promise((resolve, object) => {
                RunDays.find({}, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                })
            })
        },
        getStatsForDate: (root, { date }) => {
            return new Promise((resolve, object) => {
                RunDays.find({ date: date }, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            })
        },
        getStatsForDay: (root, { day }) => {
            return new Promise((resolve, object) => {
                RunDays.find({ day: day }, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        //resolve(result);
                        let avgDistance = _.meanBy(result, 'distance');   
                        let durations = [];
                        let speeds = [];
                        let bpm = [];
                        _.forEach(result, (r) => {
                            durations.push(r.end - r.start); // Work
                            speeds.push(_.meanBy(r.speedDetails, 'speed')); // Work
                            let meanBpm = _.meanBy(r.heartRateDetails,
                                (hr) => {
                                    let a = (hr.min + hr.max) / 2;
                                    if (isNaN(a)) a = 0;
                                    return a;
                                });
                            bpm.push(meanBpm) // Work   
                        })
                        let weekDayStats = {
                            day: day,
                            averageDistance: avgDistance,
                            averageBpm: _.mean(bpm),
                            averageSpeed: _.mean(speeds),
                            averageDuration: _.mean(durations)
                        }
                        resolve(weekDayStats);
                    }
                })
            })
        }
    },
    Mutation: {
        add: (root, { input }) => {
            const runDay = new RunDays({
                date: input.date,
                day: input.day,
                start: input.start,
                end: input.end,
                distance: input.distance,
                distanceUnit: input.distanceUnit,
                speedDetails: input.speedDetails,
                heartRateDetails: input.heartRateDetails
            });
            runDay.id = runDay._id;
            return new Promise((resolve, object) => {
                runDay.save((err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } 
                    else resolve(runDay);
                });
            });
        }
    }
}

module.exports = { resolvers };