const fs = require('fs');
const YAML = require('json-to-pretty-yaml');
const composeBuilder = require('./compose-builder')
const data = YAML.stringify(composeBuilder);
fs.writeFileSync('output.yaml', data);