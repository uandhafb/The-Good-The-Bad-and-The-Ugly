# Claude MCP Live Coding

A Strudel MCP server LLM-assisted live coding and pattern generation with Claude.

## Acknowledgments

This project is based on the original open-source work by **William Zujkowski**:
- Original repository: <https://github.com/williamzujkowski/strudel-mcp-server>

This fork keeps the original spirit and extends it with your own workflow and styles.

## What You Can Do

- Control [Strudel.cc](https://strudel.cc/) from Claude via MCP
- Generate complete patterns by style
- Generate drums, basslines, melodies, fills, and variations
- Write patterns directly to the Strudel editor and play them
- Analyze and iterate quickly during live coding sessions

## Requirements

- Node.js `>=18`
- npm `>=9`
- Claude CLI (`claude`)
- Playwright Chromium browser (installed once)

## Install (From Source)

```bash
# 1) Clone your fork
git clone https://github.com/uandhafb/PIM_LC_MCP.git
cd PIM_LC_MCP

# 2) Install dependencies
npm install

# 3) Install Chromium for Playwright
npx playwright install chromium

# 4) Build
npm run build
```

## Connect to Claude MCP

```bash
# Remove old entry if needed
claude mcp remove strudel

# Add this local build as MCP server
claude mcp add strudel node /absolute/path/to/PIM_LC_MCP/dist/index.js

# Start Claude chat
claude chat
```

## First Run in Claude Chat

Use this exact order:

1. `Initialize Strudel`

## Read Commented Lines First (Before Init)

Use this workflow when you interacted through `//` commented lines.

Step 1: ask Claude to read comment by prompt after initialize Strudel to set up
works better when you give the LLM role and rules

```text
Role: 
You are in the role of my collaborator for a live coding music performance using Strudel. Your task is to monitor and act when requested.
Rules:
1.Scan the bottom of Strudel for a commented line exactly like  //comments:
2.If you see new instructions or keywords after //comments: integrate them into the existing Strudel code.
3.You never delete previous or existing code. Only add, layer, or modify parameters as requested. 
4.If the comments are the same as before, or if the section is empty, do nothing.
```

## Pattern Generation Prompts Examples

### Generate a Complete Pattern Examples

```text
Compose bruxaria vibe
```

```text
Compose with style: "bruxaria vibe", key: "E minor"
```

### Generate Drums Example

```text
generate pattern drums magrao 0.5
```

### Generate Bassline Example

```text
Generate bassline with alien scale
```

### Generate Melody Examples

```text
Generate_melody with scale iwato
```

### Build by Layers Example

```text
Clear editor
Generate drums with style: ousadia, complexity: 0.85
Generate bassline with a dark key 
Play
```

## Styles You Can Ask For

Common complete-pattern styles:

- `techno`
- `house`
- `dnb`
- `ambient`
- `trap`
- `jungle`
- `jazz`
- `intelligent_dnb`
- `trip_hop`
- `boom_bap`
- `bruxaria vibe`
- `vibe ritimada`
- `chao pisante`
- `textura com escalas`

## Scales You Can Ask For

Available scales:

- `major`
- `minor`
- `dorian`
- `phrygian`
- `lydian`
- `mixolydian`
- `aeolian`
- `locrian`
- `pentatonic`
- `blues`
- `chromatic`
- `wholetone`
- `harmonic_minor`
- `melodic_minor`
- `ritusen`
- `pelog`
- `hirajoshi`
- `iwato`
- `enigmatic`
- `prometheus`

Scale prompt examples:

```text
Generate_melody with scale: "iwato", root: "E", length: 16
```

```text
Compose with style: "textura com escalas iwato", key: "E", auto_play: true
```

## Drum Styles for `generate_drums`

Canonical drum styles:

- `techno`
- `house`
- `dnb`
- `breakbeat`
- `trap`
- `jungle`
- `ambient`
- `experimental`
- `intelligent_dnb`
- `trip_hop`
- `boom_bap`
- `brazilian_funk_ousadia`
- `brazilian_funk_ritmado`
- `brazilian_funk_magrao`
- `brazilian_funk_bruxaria`
- `brazilian_funk_zn`
- `chao_pisante`

Useful aliases:

- `bruxaria` -> `brazilian_funk_bruxaria`
- `bruxaria funk` -> `brazilian_funk_bruxaria`
- `ritmado` -> `brazilian_funk_ritmado`
- `magrao` -> `brazilian_funk_magrao`
- `zn` -> `brazilian_funk_zn`
- `pisante` -> `chao_pisante`
- `chao pisante` -> `chao_pisante`
- `liquid` -> `intelligent_dnb`
- `triphop` -> `trip_hop`
- `boombap` -> `boom_bap`

Drum prompt examples:

```text
Generate drums with style: "bruxaria", complexity: 0.85
```

```text
Generate pattern drum magrao 0.2
```

## Important Behavior Notes

- `compose` auto-initializes and usually auto-plays (unless `auto_play: false`).
- `generate drums` / `generate bassline` / `generate melody` do **not** auto-initialize the browser.
- If Strudel is not initialized, generation may be stored but not written to the visible editor yet.

## Troubleshooting

### 1) "It generated but nothing appears"

Run:

1. `Initialize Strudel`
2. Repeat your generation command
3. `Show current pattern`

### 2) "My code changes are not reflected"

After changing `src/`, rebuild and restart chat:

```bash
npm run build
claude chat
```

### 3) Bruxaria style not matching expected output

- Use exact spelling: `bruxaria` or `bruxaria vibe`
- `bruvaria` (with `v`) is treated as a different unknown style

### 4) Browser issues

```bash
npx playwright install chromium
```

## Development Commands

```bash
# Dev mode (watch)
npm run dev

# Build
npm run build

# Start built server
npm start

# Tests
npm test
npm run test:integration

# Lint / format
npm run lint
npm run format
```

## Project Layout

```text
src/
  server/                # MCP tool routing
  services/              # Pattern generation, theory, analysis
  utils/                 # Validation, logging, recovery
patterns/                # Saved/generated pattern data
```

## Acknowledgments

- **Original creator:** [William Zujkowski](https://github.com/williamzujkowski)
- [Strudel.cc](https://strudel.cc) - live coding environment
- [TidalCycles](https://tidalcycles.org) - pattern language inspiration
- [Anthropic](https://anthropic.com) - Claude + MCP ecosystem
- [Playwright](https://playwright.dev) - browser automation
