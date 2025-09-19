/*
  One-off symmetric sync between AGENTS.md and CLAUDE.md.
  - If files differ, the most recently modified wins and the other is updated to match.
  - If identical, no changes are made.

  Usage:
    node ./dev/sync-once.js
*/

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

(async function main() {
  const repoRoot = path.join(__dirname, '..');
  const agentsPath = path.join(repoRoot, 'AGENTS.md');
  const claudePath = path.join(repoRoot, 'CLAUDE.md');

  ensureExists(agentsPath);
  ensureExists(claudePath);

  const [aStat, cStat] = await Promise.all([
    fsp.stat(agentsPath).catch(() => null),
    fsp.stat(claudePath).catch(() => null),
  ]);
  const [agentsContent, claudeContent] = await Promise.all([
    fsp.readFile(agentsPath, 'utf8'),
    fsp.readFile(claudePath, 'utf8'),
  ]);

  const a = normalize(agentsContent);
  const c = normalize(claudeContent);

  if (a === c) {
    log('Already in sync.');
    return;
  }

  const agentsMtime = aStat?.mtimeMs ?? 0;
  const claudeMtime = cStat?.mtimeMs ?? 0;

  if (claudeMtime >= agentsMtime) {
    // CLAUDE is newer -> update AGENTS
    await fsp.writeFile(agentsPath, claudeContent, 'utf8');
    log('Synced AGENTS.md from CLAUDE.md');
  } else {
    // AGENTS is newer -> update CLAUDE
    await fsp.writeFile(claudePath, agentsContent, 'utf8');
    log('Synced CLAUDE.md from AGENTS.md');
  }
})().catch((err) => {
  error(err?.stack || err?.message || String(err));
  process.exitCode = 1;
});

function ensureExists(p) {
  if (!fs.existsSync(p)) {
    throw new Error(`Required file not found: ${p}`);
  }
}

function normalize(s) {
  return (s || '').replace(/\r\n?/g, '\n');
}

function log(...args) {
  console.log('[sync-once]', ...args);
}

function error(...args) {
  console.error('[sync-once]', ...args);
}
