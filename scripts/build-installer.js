const { spawnSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(args) {
  const result = spawnSync(npm, args, {
    cwd: root,
    stdio: 'inherit',
    // npm.cmd must be launched through the Windows command shell.
    shell: process.platform === 'win32',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log('Installing or refreshing build dependencies...');
run(['install']);

console.log('Building the Windows installer...');
run(['run', 'build-win']);
console.log(`Installer created in ${path.join(root, 'dist')}`);
