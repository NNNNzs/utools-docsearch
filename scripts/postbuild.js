const fs = require('fs');
// const { spawn } = require('node:child_process');

const moveFile = ['preload.js', 'plugin.json', 'algolia-icon.png'];

moveFile.forEach(e => {
  fs.copyFileSync(e, `build/${e}`);
})

const pluginJson = JSON.parse(fs.readFileSync('build/plugin.json', 'utf8'));
delete pluginJson.development;

fs.writeFileSync('build/plugin.json', JSON.stringify(pluginJson, null, 2), 'utf8');



