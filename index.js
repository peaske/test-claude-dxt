#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log('🚀 Creating Claude Desktop Extension (DXT) test...\n');

async function createDXTTest() {
  try {
    // 1. Macのデフォルト「書類」フォルダにtest-claude-dxtを作成
    const documentsPath = path.join(os.homedir(), 'Documents');
    const projectPath = path.join(documentsPath, 'test-claude-dxt');
    
    console.log('📁 Creating project directory...');
    await fs.ensureDir(projectPath);
    console.log(`✅ Created: ${projectPath}`);
    
    // 2. manifest.json作成
    const manifestPath = path.join(projectPath, 'manifest.json');
    const manifest = {
      "dxt_version": "0.1",
      "name": "test-claude-dxt-app",
      "version": "1.0.0",
      "description": "Test DXT extension for Claude Desktop",
      "author": {
        "name": "Test Author"
      },
      "server": {
        "type": "node",
        "entry_point": "server/index.js",
        "mcp_config": {
          "command": "node",
          "args": ["${__dirname}/server/index.js"]
        }
      }
    };
    
    console.log('📄 Creating manifest.json...');
    await fs.writeJson(manifestPath, manifest, { spaces: 2 });
    console.log('✅ Created: manifest.json');
    
    // 3. server ディレクトリとindex.js作成
    const serverPath = path.join(projectPath, 'server');
    await fs.ensureDir(serverPath);
    
    const serverCode = `// 最小限のMCPサーバー（テスト用）
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

console.log('DXT Test Server Starting...');

const server = new Server(
  {
    name: 'test-claude-dxt-app',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {}
    },
  }
);

// 最小限のツール定義（テスト用）
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'test_tool',
        description: 'A simple test tool for DXT verification',
        inputSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Test message'
            }
          }
        }
      }
    ]
  };
});

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'test_tool') {
    return {
      content: [
        {
          type: 'text',
          text: \`DXT Test Tool executed successfully! Message: \${request.params.arguments?.message || 'Hello from DXT!'}\`
        }
      ]
    };
  }
  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('DXT Test Server connected and running!');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { server };
`;
    
    const serverFilePath = path.join(serverPath, 'index.js');
    console.log('🔧 Creating MCP server...');
    await fs.writeFile(serverFilePath, serverCode);
    console.log('✅ Created: server/index.js');
    
    // 4. package.json作成（DXTプロジェクト用）
    const dxtPackageJson = {
      "name": "test-claude-dxt-app",
      "version": "1.0.0",
      "description": "Test DXT extension",
      "main": "server/index.js",
      "dependencies": {
        "@modelcontextprotocol/sdk": "latest"
      }
    };
    
    const dxtPackagePath = path.join(projectPath, 'package.json');
    console.log('📦 Creating package.json...');
    await fs.writeJson(dxtPackagePath, dxtPackageJson, { spaces: 2 });
    console.log('✅ Created: package.json');
    
    // 5. 依存関係インストール
    console.log('📦 Installing dependencies...');
    process.chdir(projectPath);
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
    
    // 6. DXTツールインストール & パッケージ化
    console.log('🔧 Installing DXT CLI...');
    try {
      execSync('npm install -g @anthropic-ai/dxt', { stdio: 'inherit' });
      console.log('✅ DXT CLI installed');
    } catch (error) {
      console.log('⚠️  DXT CLI may already be installed or will be installed locally');
    }
    
    console.log('📦 Creating DXT package...');
    execSync('npx dxt pack', { stdio: 'inherit' });
    console.log('✅ DXT package created!');
    
    // 7. 完了メッセージ
    console.log('\n🎉 DXT Test Setup Complete!\n');
    console.log('📁 Project created at:', projectPath);
    console.log('📄 DXT file: test-claude-dxt-app.dxt');
    console.log('\n🔧 Next Steps:');
    console.log('1. Open Claude Desktop');
    console.log('2. Go to Settings > Extensions');
    console.log('3. Click "Advanced settings" → Extension Developer');
    console.log('4. Drag and drop the .dxt file to install');
    console.log('5. Verify it shows "Running" status');
    console.log('\n✨ DXT Test Ready!');
    
  } catch (error) {
    console.error('❌ Error creating DXT test:', error.message);
    process.exit(1);
  }
}

// メイン実行
createDXTTest();
