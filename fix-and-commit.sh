#!/bin/bash

echo "Generating package-lock.json and committing fixes..."

cd /Users/peaske/Development/test-claude-dxt

# package-lock.json生成
npm install

# バージョン0.1.0にアップデート
echo "Version updated to 0.1.0"

# ファイルをステージング
git add .

# 修正コミット（絵文字なし）
git commit -m "Fix MCP server JSON-RPC compliance and update to v0.1.0

- Remove console.log from MCP server for JSON-RPC compliance
- Update version management to semantic versioning (0.1.0)
- Fix GitHub Actions package-lock.json issues
- Improve error handling in MCP server
- Add proper dependency versions"

# プッシュ
git push origin main

echo "Fixes committed and pushed!"
