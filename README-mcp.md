# MCP Setup (Claude Code + Context7)

This repo includes a project-scoped MCP config so Claude Code can use the Context7 and Gluestack UI MCP servers out of the box.

## What’s included

- `.mcp.json` at the repo root registers:
  - `context7` via `npx -y @upstash/context7-mcp`
  - `gluestack-ui` via `npx -y gluestack-ui-mcp-server`
- No secrets are committed. You can optionally supply an API key locally for higher limits.

## Use with Claude Code

1) Open this project in Claude Code.
2) On first use, Claude will detect `.mcp.json` and prompt to enable/trust the `context7` MCP.
3) Verify it’s available:

```bash
claude mcp list
claude mcp status context7
claude mcp status gluestack-ui
```

### Optional: Add a local API key (kept out of git)

```bash
# replace YOUR_API_KEY with your Context7 key
claude mcp add context7 --scope local -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

This creates a local-scoped override so your key is not committed.

## Notes

- The committed config uses stdio transport via `npx`. No additional install is required.
- If you prefer a hosted MCP endpoint instead of a local process, use Claude’s HTTP transport in a local (not committed) config so you can pass auth headers.

## Gluestack UI MCP: auth options

The Gluestack UI MCP server can work in two modes:

- GitHub-powered docs (recommended): set a `GITHUB_TOKEN` for higher rate limits and private repos if needed.
- Local monorepo path: set `GLUESTACK_PATH` to a local checkout of the Gluestack UI repo.

Add credentials locally (do not commit secrets):

```bash
# Option A: pass token as arg in a local-scoped override
claude mcp add gluestack-ui --scope local -- npx -y gluestack-ui-mcp-server --github-token YOUR_GITHUB_TOKEN

# Option B: export env var before launching Claude Code
export GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

If you work from a local clone instead of GitHub, set:

```bash
export GLUESTACK_PATH=/path/to/gluestack-ui
```

## (Optional) Codex CLI users

Codex reads MCP servers from `~/.codex/config.toml`. To mirror Context7 locally:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
# add: "--api-key", "YOUR_API_KEY" for higher limits
```
