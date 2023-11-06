
var convert = require('xml-js');
var path = require('path');
var xml = require('fs').readFileSync(path.join(__dirname, "../OutageMapKML1.kml"), 'utf8');

var json = require('fs').readFileSync(path.join(__dirname, "../test.json"), 'utf8');

const fetchURL = "https://www.torontohydro.com/construction-map?p_p_id=TH_projectmap&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=%2FgetProjectMapEntries&p_p_cacheability=cacheLevelPage"

async function ThydroPlannedOut() {
    const response = await fetch(fetchURL);
    const outages = await response.json();
    return await outages;
}



const geojsoncontrollerThydro = async (req, res) => {

    let plannedoutages = await ThydroPlannedOut();
    console.log("geojsoncontrollerThydro Ran")




    var finalJsonObject =
    {
        "type": "FeatureCollection",
        "features": [



        ]
    };
    //var firstjson = JSON.parse(json)

    var firstjson = plannedoutages //JSON.parse(await plannedoutages)



    firstjson.plan.map((item) => {

        finalJsonObject.features.push(
            // latitude longitude
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [item.longitude, item.latitude]
                },
                "properties": {

                    /*
                       "latitude": "43.7921714",
      "longitude": "-79.24950044",
      "description": "Equipment Replacement",
      "startTime": "2023-06-20T09:00:00-04:00",
      "endTime": "2023-06-20T17:00:00-04:00",
      "affectedCustomers": "1-50",
      "projectStatus": "10",
      "duration": 480   
                    */
                    "color": [226, 119, 40], // Orange
                    "width": 2,
                    "description": item.description,
                    "affectedCustomers": item.affectedCustomers,
                    "startTime": item.startTime,
                    "endTime": item.endTime,
                    "duration": item.duration,
                }
            }


        );
        return finalJsonObject;

    });
    res.json(finalJsonObject);


}


module.exports = geojsoncontrollerThydro;