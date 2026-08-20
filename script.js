// =====================================================
// FUEL STATION FINDER
// =====================================================


// ================= DEFAULT STATIONS =================

const defaultStations = [

    {
        id: 1,
        name: "NNPC Mega Station",
        location: "Ilorin",
        fuel: "Petrol",
        price: 895,
        availability: "Available",
        lat: 8.4966,
        lng: 4.5421,
        reported: "Today"
    },

    {
        id: 2,
        name: "TotalEnergies",
        location: "Ilorin",
        fuel: "Petrol",
        price: 900,
        availability: "Available",
        lat: 8.5000,
        lng: 4.5300,
        reported: "Today"
    },

    {
        id: 3,
        name: "Mobil",
        location: "Lagos",
        fuel: "Diesel",
        price: 1250,
        availability: "Available",
        lat: 6.5244,
        lng: 3.3792,
        reported: "Today"
    },

    {
        id: 4,
        name: "Oando",
        location: "Ibadan",
        fuel: "Kerosene",
        price: 1050,
        availability: "Low Stock",
        lat: 7.3775,
        lng: 3.9470,
        reported: "Yesterday"
    },

    {
        id: 5,
        name: "Conoil",
        location: "Abuja",
        fuel: "Petrol",
        price: 910,
        availability: "Available",
        lat: 9.0765,
        lng: 7.3986,
        reported: "Today"
    },

    {
        id: 6,
        name: "MRS Oil",
        location: "Port Harcourt",
        fuel: "Diesel",
        price: 1275,
        availability: "Out of Stock",
        lat: 4.8156,
        lng: 7.0498,
        reported: "2 days ago"
    },

    {
        id: 7,
        name: "Rainoil",
        location: "Lagos",
        fuel: "Petrol",
        price: 905,
        availability: "Available",
        lat: 6.6018,
        lng: 3.3515,
        reported: "Today"
    },

    {
        id: 8,
        name: "Ardova",
        location: "Abuja",
        fuel: "Diesel",
        price: 1260,
        availability: "Available",
        lat: 9.0579,
        lng: 7.4951,
        reported: "Today"
    }

];


// ================= LOAD DATA =================

let stations =
    JSON.parse(localStorage.getItem("fuelStations"))
    || defaultStations;


// ================= GET HTML ELEMENTS =================

const stationList =
    document.getElementById("stationList");

const searchInput =
    document.getElementById("searchInput");

const fuelFilter =
    document.getElementById("fuelFilter");

const resetBtn =
    document.getElementById("resetBtn");

const reportForm =
    document.getElementById("reportForm");

const stationCount =
    document.getElementById("stationCount");

const cheapestPrice =
    document.getElementById("cheapestPrice");

const selectedFuel =
    document.getElementById("selectedFuel");

const darkModeBtn =
    document.getElementById("darkModeBtn");

    const findLocationBtn =
    document.getElementById("findLocationBtn");

const locationStatus =
    document.getElementById("locationStatus");

let selectedCoordinates = null;

const myLocationBtn =
    document.getElementById("myLocationBtn");




// findLocationBtn.addEventListener("click", async function () {

//     const locationInput = document.getElementById("location");

//     const location = locationInput.value.trim();

//     if (!location) {
//         locationStatus.textContent =
//             "Please enter a location first.";
//         return;
//     }

//     locationStatus.textContent =
//         "Finding location...";

//     try {

//         const response = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ng&q=${encodeURIComponent(location)}`
//         );

//         const results = await response.json();

//         if (results.length === 0) {

//             selectedCoordinates = null;

//             locationStatus.textContent =
//                 "Location not found. Try a more specific location.";

//             return;
//         }

//         selectedCoordinates = {
//             lat: Number(results[0].lat),
//             lng: Number(results[0].lon)
//         };

//         locationStatus.textContent =
//             `Location found: ${results[0].display_name}`;

//         map.setView(
//             [
//                 selectedCoordinates.lat,
//                 selectedCoordinates.lng
//             ],
//             14
//         );

//     } catch (error) {

//         console.error(error);

//         locationStatus.textContent =
//             "Unable to find the location. Check your internet connection.";
//     }

// });




// =====================================================
// MAP
// =====================================================

const map = L.map("map").setView(
    [9.0820, 8.6753],
    6
);


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// Store map markers

let markers = [];

findLocationBtn.addEventListener("click", async function () {

    const locationInput = document.getElementById("location");

    const location = locationInput.value.trim();

    if (!location) {
        locationStatus.textContent =
            "Please enter a location first.";
        return;
    }

    locationStatus.textContent =
        "Finding location...";

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ng&q=${encodeURIComponent(location)}`
        );

        const results = await response.json();

        if (results.length === 0) {

            selectedCoordinates = null;

            locationStatus.textContent =
                "Location not found. Try a more specific location.";

            return;
        }

        selectedCoordinates = {
            lat: Number(results[0].lat),
            lng: Number(results[0].lon)
        };

        locationStatus.textContent =
            `Location found: ${results[0].display_name}`;

        map.setView(
            [
                selectedCoordinates.lat,
                selectedCoordinates.lng
            ],
            14
        );

    } catch (error) {

        console.error(error);

        locationStatus.textContent =
            "Unable to find the location. Check your internet connection.";
    }

});


myLocationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {
        alert("Your browser does not support location services.");
        return;
    }

    myLocationBtn.textContent = "📍 Finding...";

    navigator.geolocation.getCurrentPosition(
        function (position) {

            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Move map to your location
            map.setView([userLat, userLng], 15);

            // Add your location marker
            L.marker([userLat, userLng])
                .addTo(map)
                .bindPopup("<strong>You are here</strong>")
                .openPopup();

            myLocationBtn.textContent = "📍 My Location";
        },

        function (error) {

            console.error(error);

            myLocationBtn.textContent = "📍 My Location";

            alert(
                "Location could not be found. Please allow location access in your browser."
            );
        }
    );
});




// =====================================================
// DISPLAY STATIONS
// =====================================================

function displayStations(data) {

    stationList.innerHTML = "";


    if (data.length === 0) {

        stationList.innerHTML = `
            <div class="empty">
                <h3>No stations found</h3>

                <p>
                    Try another station name,
                    location or fuel type.
                </p>
            </div>
        `;

        updateSummary(data);

        updateMap(data);

        return;
    }


    data.forEach(station => {

        const card =
            document.createElement("div");


        card.className = "card";


        // Fuel badge class

        let fuelClass = "";

        if (station.fuel === "Petrol") {

            fuelClass = "petrol";

        }

        else if (station.fuel === "Diesel") {

            fuelClass = "diesel";

        }

        else {

            fuelClass = "kerosene";

        }


        // Availability class

        let availabilityClass =
            station.availability
                .toLowerCase()
                .replace(" ", "-");


        card.innerHTML = `

            <h3>
                ${station.name}
            </h3>

            <p>
                📍 ${station.location}
            </p>

            <p>

                <span class="badge ${fuelClass}">
                    ${station.fuel}
                </span>

            </p>

            <p class="price">
                ₦${Number(station.price).toLocaleString()}/L
            </p>

            <p>
                Availability:
                <strong class="${availabilityClass}">
                    ${station.availability}
                </strong>
            </p>

            <p>
                <small>
                    Reported: ${station.reported}
                </small>
            </p>

        `;


        stationList.appendChild(card);

    });


    updateSummary(data);

    updateMap(data);

}


// =====================================================
// UPDATE MAP
// =====================================================

function updateMap(data) {


    // Remove old markers

    markers.forEach(marker => {

        map.removeLayer(marker);

    });


    markers = [];


    // Add new markers

    data.forEach(station => {


        const marker =
            L.marker([
                station.lat,
                station.lng
            ]).addTo(map);


        marker.bindPopup(`

            <div>

                <h3>
                    ${station.name}
                </h3>

                <p>
                    📍 ${station.location}
                </p>

                <p>
                    Fuel:
                    <strong>
                        ${station.fuel}
                    </strong>
                </p>

                <p>
                    Price:
                    <strong>
                        ₦${Number(station.price).toLocaleString()}/L
                    </strong>
                </p>

                <p>
                    Status:
                    <strong>
                        ${station.availability}
                    </strong>
                </p>

            </div>

        `);


        markers.push(marker);

    });


    // Fit map to stations

    if (data.length > 0) {

        const bounds =
            L.latLngBounds(
                data.map(station => [
                    station.lat,
                    station.lng
                ])
            );


        map.fitBounds(bounds, {
            padding: [30, 30]
        });

    }

}


// =====================================================
// SUMMARY
// =====================================================

function updateSummary(data) {


    // Number of stations

    stationCount.textContent =
        data.length;


    // Selected fuel

    selectedFuel.textContent =
        fuelFilter.value === "all"
            ? "All"
            : fuelFilter.value;


    // Cheapest

    if (data.length === 0) {

        cheapestPrice.textContent =
            "₦0";

        return;

    }


    const prices =
        data.map(
            station =>
                Number(station.price)
        );


    const cheapest =
        Math.min(...prices);


    cheapestPrice.textContent =
        `₦${cheapest.toLocaleString()}`;

}


// =====================================================
// FILTER FUNCTION
// =====================================================

function filterStations() {


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedFuelType =
        fuelFilter.value;


    const filtered =
        stations.filter(station => {


            const matchesSearch =

                station.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                station.location
                    .toLowerCase()
                    .includes(searchValue);


            const matchesFuel =

                selectedFuelType === "all"

                ||

                station.fuel ===
                    selectedFuelType;


            return (
                matchesSearch &&
                matchesFuel
            );

        });


    displayStations(filtered);

}


// =====================================================
// SEARCH
// =====================================================

searchInput.addEventListener(
    "input",
    filterStations
);


// =====================================================
// FUEL FILTER
// =====================================================

fuelFilter.addEventListener(
    "change",
    filterStations
);


// =====================================================
// RESET
// =====================================================

resetBtn.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        fuelFilter.value = "all";

        displayStations(stations);

    }
);


// =====================================================
// REPORT NEW PRICE
// =====================================================

reportForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("stationName")
                .value
                .trim();


        const location =
            document
                .getElementById("location")
                .value
                .trim();


        const fuel =
            document
                .getElementById("fuelType")
                .value;


        const price =
            Number(
                document
                    .getElementById("price")
                    .value
            );


        const availability =
            document
                .getElementById("availability")
                .value;


        // Basic validation

        if (
            !name ||
            !location ||
            !price ||
            price <= 0
        ) {

            alert(
                "Please fill in all fields correctly."
            );

            return;

        }


        // Temporary coordinates

        if (!selectedCoordinates) {

    alert(
        "Please find the station location before submitting the report."
    );

    return;
}

const lat = selectedCoordinates.lat;
const lng = selectedCoordinates.lng;


        const newStation = {

            id: Date.now(),

            name: name,

            location: location,

            fuel: fuel,

            price: price,

            availability:
                availability,

            lat: lat,

            lng: lng,

            reported: "Just now"

        };


        stations.push(newStation);


        // Save to browser

        localStorage.setItem(
            "fuelStations",
            JSON.stringify(stations)
        );


        // Refresh list

        displayStations(stations);


        // Clear form

        reportForm.reset();

        selectedCoordinates = null;
locationStatus.textContent = "";


        // Message

        alert(
            "Fuel price report submitted successfully!"
        );

    }
);

darkModeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        darkModeBtn.textContent =
            dark ? "☀️" : "🌙";


        localStorage.setItem(
            "darkMode",
            dark
        );

    }
);


// Load dark mode preference

const savedDarkMode =
    localStorage.getItem("darkMode");


if (savedDarkMode === "true") {

    document.body.classList.add("dark");

    darkModeBtn.textContent = "☀️";

}


// =====================================================
// INITIAL DISPLAY
// =====================================================

displayStations(stations);



// myLocationBtn.addEventListener(
//     "click",
//     function () {

//         if (!navigator.geolocation) {

//             alert(
//                 "Your browser does not support location services."
//             );

//             return;
//         }

//         myLocationBtn.textContent =
//             "📍 Finding you...";

//         navigator.geolocation.getCurrentPosition(

//             function (position) {

//                 const userLat =
//                     position.coords.latitude;

//                 const userLng =
//                     position.coords.longitude;

//                 // Move map to user's location

//                 map.setView(
//                     [userLat, userLng],
//                     14
//                 );


//                 // Add marker

//                 L.marker(
//                     [userLat, userLng]
//                 )
//                 .addTo(map)
//                 .bindPopup(
//                     "<strong>You are here</strong>"
//                 )
//                 .openPopup();


//                 myLocationBtn.textContent =
//                     "📍 My Location";

//             },

//             function (error) {

//                 console.error(error);

//                 alert(
//                     "Unable to get your location. Please allow location access in your browser."
//                 );

//                 myLocationBtn.textContent =
//                     "📍 My Location";

//             }

//         );

//     }
// );