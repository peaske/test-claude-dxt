#!/bin/bash

echo "Fixing install button bug and clearing cache..."

cd /Users/peaske/Development/test-claude-dxt

# 全キャッシュクリア
npm cache clean --force
rm -rf node_modules package-lock.json

# 再インストール
npm install

# ファイルをステージング
git add .

# バグ修正版をコミット
git commit -m "Fix install button bug v0.2.1

Critical fixes:
- Replace SVG icon with PNG format (Claude Desktop requirement)
- Add comprehensive cache clearing before DXT creation
- Improve error handling for DXT CLI installation
- Add fallback mechanisms for local DXT tools
- Better debugging output for installation issues

The install button should now activate properly after drag & drop."

# プッシュ
git push origin main

echo "Bug fix committed and pushed!"
echo "Test with: npx github:peaske/test-claude-dxt"
