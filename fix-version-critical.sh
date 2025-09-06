#!/bin/bash

echo "CRITICAL FIX: Claude Desktop version compatibility"

cd /Users/peaske/Development/test-claude-dxt

# キャッシュクリア
npm cache clean --force

# ファイルをステージング
git add .

# 重要なバージョン修正をコミット
git commit -m "Fix Claude Desktop version compatibility v0.2.2

CRITICAL FIX:
- Change claude_desktop requirement from >=1.0.0 to >=0.12.0
- Current Claude Desktop is v0.12.129, not 1.0.0+
- This was blocking installation button activation

Technical details:
- Researched actual Claude Desktop versions (0.12.x series)
- Aligned with working Filesystem extension requirements
- Should now pass compatibility checks and allow installation"

# プッシュ
git push origin main

echo "CRITICAL VERSION FIX committed and pushed!"
echo "This should resolve the install button issue!"
echo "Test immediately with: npx github:peaske/test-claude-dxt"
