/* make sure you write your tests for your utils functions in here :eyes: */
const { prepareRides, createParksReference } = require("../db/utils");

describe("prepareRides", () => {
  test("returns an nested array of rides information with the ride_name, year_opened and votes as the first items in the array", () => {
    const parks = [{ park_id: 1, park_name: "Test_park" }];
    const rides = [
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
    ];

    const formattedRides = prepareRides(rides, parks);
    expect(formattedRides[0][0]).toBe("Tidal Wave");
    expect(formattedRides[0][1]).toBe(2000);
    expect(formattedRides[0][2]).toBe(1);
  });
  test("adds the park_id as the 4th item in the array", () => {
    const parks = [{ park_id: 1, park_name: "Test_park" }];
    const rides = [
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
    ];

    const formattedRides = prepareRides(rides, parks);
    expect(formattedRides[0][3]).toBe(1);
  });
  test("given mutliple rides that share teh same park will return the correctly formatted array", () => {
    const parks = [{ park_id: 1, park_name: "Test_park" }];
    const rides = [
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
      {
        ride_name: "Other Ride",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
    ];

    const formattedRides = prepareRides(rides, parks);
    expect(formattedRides).toEqual([
      ["Tidal Wave", 2000, 1, 1],
      ["Other Ride", 2000, 1, 1],
    ]);
  });
  test("given mutliple parks will apply the correct park_id", () => {
    const parks = [
      { park_id: 2, park_name: "Other Park" },
      { park_id: 1, park_name: "Test_park" },
    ];
    const rides = [
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
      {
        ride_name: "Other Ride",
        year_opened: 2000,
        park_name: "Other Park",
        votes: 1,
      },
    ];

    const formattedRides = prepareRides(rides, parks);
    expect(formattedRides).toEqual([
      ["Tidal Wave", 2000, 1, 1],
      ["Other Ride", 2000, 1, 2],
    ]);
  });
  test("does not mutate input data", () => {
    const parks = [
      { park_id: 2, park_name: "Other Park" },
      { park_id: 1, park_name: "Test_park" },
    ];
    const rides = [
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
      {
        ride_name: "Other Ride",
        year_opened: 2000,
        park_name: "Other Park",
        votes: 1,
      },
    ];

    prepareRides(rides, parks);
    expect(parks).toEqual([
      { park_id: 2, park_name: "Other Park" },
      { park_id: 1, park_name: "Test_park" },
    ]);
    expect(rides).toEqual([
      {
        ride_name: "Tidal Wave",
        year_opened: 2000,
        park_name: "Test_park",
        votes: 1,
      },
      {
        ride_name: "Other Ride",
        year_opened: 2000,
        park_name: "Other Park",
        votes: 1,
      },
    ]);
  });
});

describe("createParksReference()", () => {
  test("given a single park will return an object with its name as a key and the park_id as its value", () => {
    const parks = [{ park_id: 1, park_name: "Test_park" }];
    const lookup = createParksReference(parks);
    expect(lookup["Test_park"]).toBe(1);
  });
  test("given multiple parks will return the names and ids correctly", () => {
    const parks = [
      { park_id: 1, park_name: "Test_park" },
      { park_id: 2, park_name: "Other park" },
    ];
    const lookup = createParksReference(parks);
    expect(lookup).toEqual({ "Other park": 2, Test_park: 1 });
  });
  test("does not mutate the parks input", () => {
    const parks = [
      { park_id: 1, park_name: "Test_park" },
      { park_id: 2, park_name: "Other park" },
    ];
    createParksReference(parks);
    expect(parks).toEqual([
      { park_id: 1, park_name: "Test_park" },
      { park_id: 2, park_name: "Other park" },
    ]);
  });
});
