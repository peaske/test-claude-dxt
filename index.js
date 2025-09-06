#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log('Creating official DXT test extension...\n');

async function createOfficialDXTTest() {
  try {
    // 1. Macのデフォルト「書類」フォルダにtest-claude-dxtを作成
    const documentsPath = path.join(os.homedir(), 'Documents');
    const projectPath = path.join(documentsPath, 'test-claude-dxt');
    
    console.log('Creating project directory...');
    await fs.ensureDir(projectPath);
    console.log(`Created: ${projectPath}`);
    
    // 2. 公式DXT仕様準拠のmanifest.json作成
    const manifest = {
      "dxt_version": "0.1",
      "name": "test-claude-dxt-app",
      "display_name": "Test Claude DXT App",
      "version": "0.1.0",
      "description": "A test DXT extension for Claude Desktop verification",
      "author": {
        "name": "Test Author",
        "email": "test@example.com"
      },
      "icon": "icon.svg",
      "server": {
        "type": "node",
        "entry_point": "server/index.js",
        "mcp_config": {
          "command": "node",
          "args": ["${__dirname}/server/index.js"]
        }
      },
      "tools": [
        {
          "name": "test_time",
          "description": "Get current time for testing DXT functionality"
        }
      ],
      "keywords": ["test", "dxt", "claude", "mcp"],
      "license": "MIT",
      "compatibility": {
        "claude_desktop": ">=1.0.0",
        "platforms": ["darwin", "win32"],
        "runtimes": {
          "node": ">=16.0.0"
        }
      }
    };
    
    console.log('Creating manifest.json...');
    await fs.writeJson(path.join(projectPath, 'manifest.json'), manifest, { spaces: 2 });
    console.log('Created: manifest.json');
    
    // 3. package.json作成（DXTプロジェクト用）
    const packageJson = {
      "name": "test-claude-dxt-app",
      "version": "0.1.0",
      "description": "Test DXT extension",
      "main": "server/index.js",
      "dependencies": {
        "@modelcontextprotocol/sdk": "^1.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    };
    
    console.log('Creating package.json...');
    await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
    console.log('Created: package.json');
    
    // 4. server ディレクトリ作成
    const serverPath = path.join(projectPath, 'server');
    await fs.ensureDir(serverPath);
    
    // 5. 公式仕様準拠のMCPサーバー作成
    const serverCode = `const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

const server = new Server(
  {
    name: 'test-claude-dxt-app',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Test tool: Get current time
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'test_time',
        description: 'Get current time for testing DXT functionality',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        }
      }
    ]
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name } = request.params;
  
  if (name === 'test_time') {
    const now = new Date();
    return {
      content: [
        {
          type: 'text',
          text: \`DXT Test Tool executed successfully!
Current time: \${now.toISOString()}
Local time: \${now.toLocaleString()}
Extension is working correctly!\`
        }
      ]
    };
  }
  
  throw new Error(\`Unknown tool: \${name}\`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Server error:', error);
    process.exit(1);
  });
}
`;
    
    console.log('Creating MCP server...');
    await fs.writeFile(path.join(serverPath, 'index.js'), serverCode);
    console.log('Created: server/index.js');
    
    // 6. シンプルなテストアイコン作成
    console.log('Creating test icon...');
    const iconContent = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="#4F46E5"/>
  <text x="32" y="40" font-family="Arial" font-size="32" fill="white" text-anchor="middle">T</text>
</svg>`;
    await fs.writeFile(path.join(projectPath, 'icon.svg'), iconContent);
    console.log('Created: icon.svg (placeholder icon)');
    
    // 7. 依存関係インストール
    console.log('Installing dependencies...');
    process.chdir(projectPath);
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed');
    
    // 8. DXTツールインストール & パッケージ化
    console.log('Installing DXT CLI...');
    try {
      execSync('npm install -g @anthropic-ai/dxt', { stdio: 'inherit' });
      console.log('DXT CLI installed');
    } catch (error) {
      console.log('DXT CLI may already be installed or will be installed locally');
    }
    
    console.log('Creating DXT package...');
    try {
      execSync('npx dxt pack', { stdio: 'inherit' });
      console.log('DXT package created successfully!');
    } catch (error) {
      console.log('DXT pack error:', error.message);
      console.log('Trying with local dxt...');
      execSync('npx @anthropic-ai/dxt pack', { stdio: 'inherit' });
      console.log('DXT package created with local CLI!');
    }
    
    // 9. 完了メッセージ
    console.log('\n===== Official DXT Test Setup Complete! =====\n');
    console.log('Project created at:', projectPath);
    console.log('DXT file: test-claude-dxt-app.dxt');
    console.log('\nNext Steps:');
    console.log('1. Open Claude Desktop');
    console.log('2. Go to Settings > Extensions');
    console.log('3. Click "Advanced settings" → Extension Developer');
    console.log('4. Drag and drop the .dxt file to install');
    console.log('5. Verify it shows "Running" status');
    console.log('\nOfficial DXT Test Ready!');
    
  } catch (error) {
    console.error('Error creating official DXT test:', error.message);
    process.exit(1);
  }
}

// メイン実行
createOfficialDXTTest();
