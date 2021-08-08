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

module.exports.chunkTable = function(kv_array) {
    const entryCount = kv_array.find(k => k.key === 'Entry Count').value;
    const offsets = kv_array.filter(k => k.key === 'Chunk Offset');

    const count = "<p><strong>Entry Count</strong>: " + entryCount + "</p><br>";

    let table = "";
    offsets.forEach ((o, index) => {
        table += "<tr><th>" + (index+1) + "</th><td>" + o.value + "</td><td>" + o.size + "</td><td><a href=\"javascript:downloadPirtial(" + o.offset + "," + o.size + ")\"><i class='fas fa-download'></i></a></td></tr>";
    });
    return count + "<h2><strong>Chunk Offset</strong></h2>" + "<table class='table is-bordered is-striped'><tr><th>No.</th><th>Offset</th><th>Size</th><th>Data</th></tr>" + table + "</table>";
}

module.exports.sizeTable = function(kv_array) {
    const sampleCount = kv_array.find(k => k.key === 'Sample Count').value;
    const sizes = kv_array.filter(k => k.key === 'Entry Size');

    const count = "<p><strong>Sample Count</strong>: " + sampleCount + "</p><br>";

    let table = "";
    sizes.forEach ((o, index) => {
        table += "<tr><th>" + (index+1) + "</th><td>" + o.value + "</td><td>" + o.offset + "</td><td><a href=\"javascript:downloadPirtial(" + o.offset + "," + o.size + ")\"><i class='fas fa-download'></i></a></td></tr>";
    });
    return count + "<h2><strong>Entry Size</strong></h2>" + "<table class='table is-bordered is-striped'><tr><th>No.</th><th>Size</th><th>Offset</th><th>Data</th></tr>" + table + "</table>";
}
