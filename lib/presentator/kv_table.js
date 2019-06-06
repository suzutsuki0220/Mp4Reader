module.exports.preview_html = function(kv_array) {
    var data = "";
    for (var i=0; i<kv_array.length; i++) {
        data += "<tr><th>" + kv_array[i].key + "</th><td>" + kv_array[i].value + "</td></tr>";
    }
    return "<table class='table is-bordered is-striped'>" + data + "</table>";
};
