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

module.exports.setPayload = function(message) {
    document.getElementById('payload').innerHTML = message;
};
