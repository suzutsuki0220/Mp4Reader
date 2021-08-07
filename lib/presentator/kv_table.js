module.exports.preview_html = function(kv_array) {
    var data = "";
    for (var i=0; i<kv_array.length; i++) {
        data += "<tr><th>" + kv_array[i].key + "</th><td>" + kv_array[i].value + "</td></tr>";
    }
    return "<table class='table is-bordered is-striped'>" + data + "</table>";
};

module.exports.locationTable = function(locations) {
    let data = "";
    locations.forEach((l) => {
        data += "<tr><td>" + l.datetime + "</td><td>" + l.longitude + "</td><td>" + l.latitude + "</td><td>" + l.altitude + "</td><td>" + l.speed + "</td><td>" + l.heading + "</td></tr>";
    });
    return "<table class='table is-bordered is-striped'><tr><th>Datetime</th><th>Longitude</th><th>Latitude</th><th>Altitude</th><th>Speed</th><th>Heading</th></tr>" + data + "</table>";
}
