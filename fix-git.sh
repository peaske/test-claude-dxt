#!/bin/bash

echo "🔧 Fixing Git repository setup..."

# 現在のディレクトリに移動
cd /Users/peaske/Development/test-claude-dxt

# Git初期化（既存の.gitがあれば削除して再初期化）
rm -rf .git
git init

# 正しいリモートリポジトリを追加
git remote add origin https://github.com/peaske/test-claude-dxt.git

# ファイルをステージング
git add .

# 初回コミット
git commit -m "🚀 Initial DXT test package implementation"

# メインブランチに設定
git branch -M main

# プッシュ
git push -u origin main

echo "✅ Git repository fixed and pushed!"
