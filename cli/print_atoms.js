require('./index.js');

const filename = process.argv[2];

fileLoader.load(filename, function(atoms) {
    console.log(atoms);
});
