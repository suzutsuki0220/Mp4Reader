module.exports.setStatus = function(message) {
    document.getElementById('load_status').innerHTML = message;
};

module.exports.setSize = function(message) {
    document.getElementById('size').innerHTML = message;
};

module.exports.setStructure = function(structure) {
    document.getElementById('structure').innerHTML = structure;
    document.getElementById('payload').innerHTML = "";
};

module.exports.setPayload = function(payload) {
    document.getElementById('payload_title').innerHTML = payload.title
    document.getElementById('payload_description').innerHTML = payload.description
    document.getElementById('payload').innerHTML = payload.preview;
};
