const { gql } = require('apollo-server');

const typeDefs = gql`
"""
The query object containing all available queries
"""
    type Query {
        "Returns all available stats"
        getStats: [RunDay]!
        "Returns stats for a selected date"
        getStatsForDate(date: String!): RunDay!
        "Returns stats a selected week day"
        getStatsForDay(day: WeekDay!): WeekDayStats!
    }
    
    type Mutation {
        add(input: RunDayInput): RunDay!
    }

    type WeekDayStats {
        day: WeekDay!
        averageDistance: Float!
        averageBpm: Float!
        averageDuration: Float!
        averageSpeed: Float!
    }

    type RunDay{
        id: ID!
        date: String!
        day: WeekDay!
        start: Int!
        end: Int!
        distance: Float!
        distanceUnit: DistanceUnit!
        speedDetails: [SpeedDetail]!
        heartRateDetails: [HeartRateDetail]!
    }

    input RunDayInput{
        date: String!
        day: WeekDay!
        start: Int!
        end: Int!
        distance: Float!
        distanceUnit: DistanceUnit!
        speedDetails: [SpeedDetailInput]!
        heartRateDetails: [HeartRateDetailInput]!
    }

    input SpeedDetailInput {
        km: Int!
        speed: Float!
    }
    type SpeedDetail {
        km: Int!
        speed: Float!
    }
    input HeartRateDetailInput {
        km: Int!
        min: Int!
        max: Int!
    }
    type HeartRateDetail {
        km: Int!
        min: Int!
        max: Int!
    }

    enum DistanceUnit {
        KM
        M
        MI
    }

    enum SpeedUnit {
        KPH
        MPH
    }

    enum WeekDay {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
    }
    
`;

module.exports = { typeDefs }