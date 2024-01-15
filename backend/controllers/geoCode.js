exports.getGeoCode = async (req, res, next) => {
    console.log("getGeoCode");
    var address = req.body.address;
    console.log(address);
    var result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.API_KEY}`);
    var geoData = await result.json();
    var geometry = geoData.results[0].geometry;
    var location = geometry.location;

    console.log(location);

    location.lat = 37.4450;
    location.lng = -122.1390;

    var resultURls = await fetch(`https://solar.googleapis.com/v1/dataLayers:get?location.latitude=${location.lat}&location.longitude=${location.lng}&radiusMeters=100&view=FULL_LAYERS&requiredQuality=LOW&pixelSizeMeters=0.5&key=${process.env.API_KEY}`);
    var urlsData = await resultURls.json();
    console.log(urlsData);

    var rgbURLWithKey = urlsData.rgbUrl + `&key=${process.env.API_KEY}`;
    console.log(rgbURLWithKey);
    var dsmUrlWithKey = urlsData.dsmUrl + `&key=${process.env.API_KEY}`;
    console.log(dsmUrlWithKey);
    var maskUrlWithKey = urlsData.maskUrl + `&key=${process.env.API_KEY}`;
    console.log(maskUrlWithKey);
    var annualFluxUrlWithKey = urlsData.annualFluxUrl + `&key=${process.env.API_KEY}`;
    console.log(annualFluxUrlWithKey);

    var urls = {
        rgbUrl: rgbURLWithKey,
        dsmUrl: dsmUrlWithKey,
        maskUrl: maskUrlWithKey,
        annualFluxUrl: annualFluxUrlWithKey
    };

    var resultData = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${location.lat}&location.longitude=${location.lng}&requiredQuality=MEDIUM&key=${process.env.API_KEY}`,
    {
        method: 'GET',
    }
    );
    var solarData = await resultData.json();
    solarData.urls = urls;
    console.log(solarData);
    return res.status(200).json(solarData);
};

