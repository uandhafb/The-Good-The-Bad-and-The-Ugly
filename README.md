# Commands to initialize the Strudel MCP server for Claude
1. Using the terminal:
cd /Users/uandha/TF_ClaudeMCP/strudel-mcp-server
npm install
npx playwright install chromium
npm run build

2. Configure the MCP server in Claude:
claude mcp remove strudel
claude mcp add strudel node $(pwd)/dist/index.js

3. Launch Claude:
claude chat

