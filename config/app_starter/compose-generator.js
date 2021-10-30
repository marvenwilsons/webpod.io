const fs = require('fs');
const YAML = require('json-to-pretty-yaml');
const json = require('input.json');

const data = YAML.stringify(json);
fs.writeFile('output.yaml', data);