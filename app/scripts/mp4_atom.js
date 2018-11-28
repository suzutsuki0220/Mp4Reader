module.exports.atom = {
    ftyp: {
        description: "hagehage",
        hasChild: false,
        decode: function(payload) {
            var str = "";
            var i = 0;
            while (i < payload.size) {
                str += str ? " " : "";
                str += payload.toString('hex');
                i++;
            }
            return str;
        }
    }
};
