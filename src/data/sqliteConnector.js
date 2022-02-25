const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'stats.sqlite'
});

const RunDays = sequelize.define('RunDays', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATE, allowNull: false },
    day: { type: DataTypes.STRING, allowNull: false },
    start: { type: DataTypes.SMALLINT, allowNull: false },
    end: { type: DataTypes.SMALLINT, allowNull: false },
    distance: { type: DataTypes.FLOAT, allowNull: false },
    distanceUnit: { type: DataTypes.STRING, allowNull: false }
});

const SpeedDetails = sequelize.define('SpeedDetails', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    runDaysId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RunDays,
            key: 'id'
        }
    },
    km: { type: DataTypes.SMALLINT, allowNull: false },
    speed: { type: DataTypes.FLOAT, allowNull: false }
});

const HeartRateDetails = sequelize.define('HeartRateDetails', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    runDaysId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RunDays,
            key: 'id'
        }
    },
    km: { type: DataTypes.SMALLINT, allowNull: false },
    min: { type: DataTypes.SMALLINT, allowNull: false },
    max: { type: DataTypes.SMALLINT, allowNull: false },
})