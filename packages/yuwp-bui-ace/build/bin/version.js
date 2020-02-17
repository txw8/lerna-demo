var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
var content = {'1.3.0': '1.3', '1.2.1': '1.2', '1.1.1': '1.1', '1.0.3': '1.0'};
if (!content[version]) content[version] = '1.1';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
