const parks = require("./data/parks");
const rides = require("./data/rides")

function prepareRides (rides, parks){
    const parksLookup = createParksReference(parks)
    return rides.map((ride)=>{
        const {ride_name, year_opened, votes, park_name}= ride
        return [ride_name, year_opened, votes, parksLookup[park_name]    ]
    })
}

function createParksReference(parks){
    const lookup = {}
    parks.forEach((park, index) => {
        
        // Check if park_id exists, otherwise generate one using the index
        const parkId = park.park_id !== undefined ? park.park_id : index + 1;

        // Assign the ID to the lookup table
        lookup[park.park_name] = parkId;
    });
    return lookup
}


module.exports = {prepareRides, createParksReference}