import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function waitPort(port, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(`http://localhost:${port}/articles`, (res) => {
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Timeout waiting for port ' + port));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

console.log('[PulseNews Runner] Starting production preview server...');
const preview = spawn('npm', ['run', 'preview', '--', '--port', '5000'], {
  stdio: 'inherit',
  shell: true
});

preview.on('error', (err) => {
  console.error('[PulseNews Runner] Failed to start preview server:', err);
  process.exit(1);
});

(async () => {
  try {
    console.log('[PulseNews Runner] Waiting for server on port 5000...');
    await waitPort(5000);
    console.log('[PulseNews Runner] Server is ready! Launching performance tests...');
    
    const tests = spawn('npm', ['run', 'test:performance'], {
      stdio: 'inherit',
      shell: true
    });
    
    tests.on('close', (code) => {
      console.log(`[PulseNews Runner] Performance tests finished with exit code: ${code}`);
      preview.kill();
      // On Windows, sometimes child processes don't terminate immediately, so force exit.
      process.exit(code);
    });
  } catch (err) {
    console.error('[PulseNews Runner] Error occurred:', err.message);
    preview.kill();
    process.exit(1);
  }
})();
