const obj2gltf = require('obj2gltf');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const options = {
    binary: true
};

const { i, o } = argv;

obj2gltf(i, options)
    .then(function (glb) {
        fs.writeFileSync(`${o}.glb`, glb);
    });
