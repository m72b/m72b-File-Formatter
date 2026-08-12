const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const windowsAppExe = 'm72b file formatter.exe';

function run(args) {
  const command = process.platform === 'win32' ? process.env.ComSpec || 'cmd.exe' : 'npm';
  const commandArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'npm', ...args] : args;
  const result = spawnSync(command, commandArgs, {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

function removeBuildOutput(output, required = true) {
  const target = path.join(root, output);
  if (!fs.existsSync(target)) return;

  try {
    console.log(`Removing old build output: ${output}`);
    fs.rmSync(target, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
  } catch (error) {
    if (required) throw error;
    console.warn(`Could not remove old ${output} folder. Close any open windows using it and delete it later.`);
  }
}

function closeRunningApp() {
  if (process.platform !== 'win32') return;
  spawnSync('taskkill.exe', ['/IM', windowsAppExe, '/F', '/T'], { stdio: 'ignore' });
}

closeRunningApp();
removeBuildOutput('dist');
removeBuildOutput('release');
removeBuildOutput("m72b's test build", false);
console.log('Installing or refreshing build dependencies...');
run(['install']);

console.log('Building the Windows installer...');
run(['run', 'build-win']);
console.log(`Installer created in ${path.join(root, 'release')}`);
