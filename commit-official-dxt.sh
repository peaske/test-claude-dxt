#!/bin/bash

echo "Committing official DXT specification implementation..."

cd /Users/peaske/Development/test-claude-dxt

# package-lock.json生成（まだなければ）
npm install

# ファイルをステージング
git add .

# 公式仕様準拠版をコミット
git commit -m "Implement official DXT specification v0.2.0

Major improvements:
- Full compliance with official Anthropic DXT manifest specification
- Proper manifest.json structure with dxt_version 0.1
- Complete MCP server implementation using @modelcontextprotocol/sdk
- Test time tool for functionality verification
- Cross-platform compatibility (macOS, Windows)
- Proper error handling and transport setup
- SVG icon placeholder for visual identification

Technical changes:
- manifest.json now follows official DXT spec exactly
- Server implements proper JSON-RPC over stdio transport
- Tool schema validation and structured responses
- Platform compatibility declarations
- Version bumped to 0.2.0 for official spec compliance"

# プッシュ
git push origin main

echo "Official DXT implementation committed and pushed!"
echo "Ready for testing with: npx github:peaske/test-claude-dxt"
