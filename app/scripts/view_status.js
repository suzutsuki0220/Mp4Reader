module.exports.setStatus = function(message) {
    document.getElementById('load_status').innerHTML = message;
};

module.exports.setSize = function(message) {
    document.getElementById('size').innerHTML = message;
};

module.exports.setData = function(message) {
    document.getElementById('data').innerHTML = message;
};
