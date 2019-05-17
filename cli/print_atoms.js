const libs = require('./index.js');
const fileloader = libs.fileLoader;

console.log(libs);

const filename = process.argv[2];

fileloader.load(filename, function(atoms) {
    console.log(atoms);
});
