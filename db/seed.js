const db = require("./connection");
const format = require("pg-format");
const { prepareRides } = require("./utils.js");

function seed({parks, rides, stalls}) {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return insertParks(parks);
    })
    .then(({ rows: parksData }) => {
      return insertRides(rides, parksData);
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(`
    CREATE TABLE parks(
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR,
      year_opened INT,
      annual_attendance INT
  )`);
}
function createRides() {
  return db.query(`
  CREATE TABLE rides(
    ride_id SERIAL PRIMARY KEY,
    ride_name VARCHAR,
    year_opened INT,
    votes INT,
    park_id INT REFERENCES parks(park_id)
)`);
}

function insertParks(parks) {
  const formattedData = parks.map((park) => {
    const { park_name, year_opened, annual_attendance } = park;
    return [park_name, year_opened, annual_attendance];
  });
  const queryString = format(
    `
  INSERT INTO parks
  (park_name, year_opened, annual_attendance)
  VALUES %L RETURNING *;
  `,
    formattedData
  );
  return db.query(queryString);
}

function insertRides(rides, parks) {
  const formattedRides = prepareRides(rides, parks);
  const queryString = format(
    `
  INSERT INTO rides
  (ride_name, year_opened, votes, park_id)
  VALUES %L
  `,
    formattedRides
  );
  return db.query(queryString);
}
module.exports = seed;
