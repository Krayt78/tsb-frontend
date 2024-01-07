
const api_key = "AIzaSyBqP62Fqz8WQI-P3jgpdehLPkuzRQMqHVE";
let longitude = 37.4450;
let latitude = -122.1390;
const address = "230 Bd Pasteur, Douai, France";

async function getInfoFromGeoCode() {
    var result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${api_key}`);
    //var result = await fetch(`https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places`);
    console.log(result);
    var geoData = await result.json();
    console.log(geoData);
    return geoData;
}

async function getLattitudeLongitude(autocomplete) {
    var place = autocomplete.getPlace();

    var lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();

    // Then do whatever you want with them

    console.log(lat);
    console.log(lng);

    return true;
}

//create a function that calls google solar API and returns the solar data
async function getSolarData() {
    var result = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${api_key}`);
    var solarData = await result.json();
    console.log(solarData);
    return solarData;
}

async function main(){
    var autocomplete = await getInfoFromGeoCode();
    //var getLattitudeLongitude = await getLattitudeLongitude(autocomplete);
}

main();
