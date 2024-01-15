async function getGeoCode(address) {
    console.log("getGeoCode");
    var result = await fetch(`https://54.84.45.33:3000/api/geocode/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address: address
        })
    });

    console.log(result.status);

    var geoData = await result.json();
    console.log(geoData);
    return geoData;
}

var gpaInput = document.getElementById("adresse");
var autocomplete = new google.maps.places.Autocomplete(gpaInput);

var nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", async function () {
    console.log("nextButton clicked");

    var address = gpaInput.value;

    await getGeoCode(address);
    console.log("getGeoCode done");
});

