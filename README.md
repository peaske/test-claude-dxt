# 🚀 Create Claude DXT Test

One-line command to create and test Claude Desktop Extensions (DXT) files.

## ⚡ Quick Start

```bash
npx github:peaske/test-claude-dxt
```

This command will:
1. ✅ Create `~/Documents/test-claude-dxt` folder
2. ✅ Generate `test-claude-dxt-app.dxt` file  
3. ✅ Install ready for Claude Desktop testing

## 🎯 What it creates

- **Directory**: `~/Documents/test-claude-dxt/`
- **DXT File**: `test-claude-dxt-app.dxt`
- **MCP Server**: Minimal test server with basic tool
- **Ready to install**: Drag & drop into Claude Desktop

## 🔧 Installation in Claude Desktop

1. Open **Claude Desktop**
2. Go to **Settings > Extensions**  
3. Click **"Advanced settings"** → **Extension Developer**
4. **Drag and drop** the `.dxt` file
5. Verify **"Running"** status ✅

## 📋 Requirements

- **Node.js** 16+ 
- **Claude Desktop** (latest version)
- **macOS/Windows** (Claude Desktop supported platforms)

## 🏗️ Project Structure

```
~/Documents/test-claude-dxt/
├── manifest.json           # DXT metadata
├── server/
│   └── index.js            # MCP server implementation  
├── package.json            # Dependencies
├── node_modules/           # Installed packages
└── test-claude-dxt-app.dxt # Final DXT file
```

## 🧪 What gets tested

- ✅ DXT file creation
- ✅ MCP server basic functionality  
- ✅ Claude Desktop installation
- ✅ "Running" status verification
- ✅ No errors/rejections

## ⚡ Development

```bash
git clone https://github.com/peaske/test-claude-dxt.git
cd test-claude-dxt
npm install
npm start
```

## 📚 Resources

- [Claude Desktop Extensions](https://www.anthropic.com/engineering/desktop-extensions)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [DXT Specification](https://github.com/anthropics/dxt)

## 📝 License

MIT © [peaske](https://github.com/peaske)
