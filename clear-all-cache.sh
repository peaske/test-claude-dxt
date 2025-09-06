#!/bin/bash

echo "=== COMPLETE CACHE CLEAR BEFORE TESTING ==="

# 1. npm キャッシュクリア
echo "Clearing npm cache..."
npm cache clean --force

# 2. node_modules 削除（グローバル含む）
echo "Clearing node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
fi

# 3. package-lock.json 削除
echo "Removing package-lock.json..."
if [ -f "package-lock.json" ]; then
    rm package-lock.json
fi

# 4. npm グローバルキャッシュ
echo "Clearing global npm cache..."
npm cache clean --force

# 5. Claude Desktop キャッシュクリア（可能な範囲）
echo "Clearing Claude Desktop related caches..."
if [ -d "$HOME/Library/Caches/Claude" ]; then
    rm -rf "$HOME/Library/Caches/Claude"
fi

# 6. システムキャッシュ
echo "Clearing system caches..."
if command -v yarn >/dev/null 2>&1; then
    yarn cache clean
fi

# 7. DXT 関連の一時ファイル削除
echo "Removing DXT temp files..."
find ~/Documents -name "*.dxt" -type f -delete 2>/dev/null || true
find ~/Downloads -name "*.dxt" -type f -delete 2>/dev/null || true

echo "=== CACHE CLEAR COMPLETE ==="
echo "Now safe to test: npx github:peaske/test-claude-dxt"
