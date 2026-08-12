const { spawnSync } = require('child_process');
const fs = require('fs');
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

function removeOldBuilds() {
  // Only remove build output owned by this project.
  for (const output of ['dist', "m72b's test build"]) {
    const target = path.join(root, output);
    if (fs.existsSync(target)) {
      console.log(`Removing old build output: ${output}`);
      fs.rmSync(target, { recursive: true, force: true });
    }
  }
}

removeOldBuilds();
console.log('Installing or refreshing build dependencies...');
run(['install']);

console.log('Building the Windows installer...');
run(['run', 'build-win']);
console.log(`Installer created in ${path.join(root, 'dist')}`);
